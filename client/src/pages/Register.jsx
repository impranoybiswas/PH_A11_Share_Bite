import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "../providers/Context";
import Container from "../customs/Container";
import Input from "../customs/Input";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SectionHead from "../customs/SectionHead";
import Button from "../customs/Button";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Loading from "../components/Loading";

export default function Register() {
  const { createUser, setLoading, googleSignIn, updateData, user, loading } =
    useContext(FirebaseContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);
    const {
      first_name,
      last_name,
      photo_url,
      phone,
      gender,
      division,
      email,
      password,
    } = formData;

    const validImage = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (!validImage.test(photo_url))
      return toast.error("Image URL must end with .jpg, .jpeg, or .png");

    const vaildNumber = /^01[3-9]\d{8}$/;
    if (!vaildNumber.test(phone)) return toast.error("Invalid phone number");

    if (
      password.length < 6 ||
      !/(?=.*[a-z])/.test(password) ||
      !/(?=.*[A-Z])/.test(password)
    )
      return toast.error(
        "Password must be at least 6 characters long, contain one lowercase letter and one uppercase letter"
      );

    if (!formData.terms)
      return toast.error("Please accept the terms and conditions.");

    const userData = {
      first_name,
      last_name,
      photo_url,
      gender,
      division,
      phone,
      email,
    };
    const displayName = first_name + " " + last_name;

    try {
      await createUser(email, password);
      updateData(displayName, photo_url);

      await axios.post(`${import.meta.env.VITE_SERVER_URL}/add-user`, userData);

      navigate(location.state || "/", { replace: true });
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account created successfully.",
        showConfirmButton: false,
        timer: 1200,
      });
      e.target.reset();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use.");
      } else {
        console.log(error.response?.data || error.message);
      }
      setLoading(false);
    }
  };
  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;
      const userData = {
        first_name: user.displayName.split(" ")[0],
        last_name: user.displayName.split(" ")[1],
        photo_url: user.photoURL,
        phone: "",
        email: user.email,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/add-user`,
        userData
      );
      console.log("MongoDB response:", res.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(location.state || "/", { replace: true });
    }
  }, [user, navigate, location.state]);

  if (loading) return <Loading />;

  return (
    <Container>
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-start">
        <div className="flex flex-col justify-center items-center md:py-10 md:sticky top-10">
          <DotLottieReact src="../assets/register.lottie" loop autoplay />
        </div>

        <div className="flex flex-col justify-center items-center bg-base-200 shadow-sm rounded-lg p-4 border-[1px] border-secondary">
          <form
            onSubmit={handleRegister}
            className="w-full flex flex-col items-center justify-center gap-3"
          >
            <SectionHead title="Register Here" subtitle="Fill the form below" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <Input
                name="first_name"
                label="First Name *"
                type="text"
                placeholder="First Name"
                passEye={false}
                req={true}
              />
              <Input
                name="last_name"
                label="Last Name"
                type="text"
                placeholder="Last Name"
                passEye={false}
              />
            </div>
            <Input
              name="photo_url"
              label="Profile Photo"
              type="text"
              placeholder="URL (.jpg, .jpeg, .png, .gif, .webp)"
              passEye={false}
              req={true}
            />
            <Input
              name="phone"
              label="Phone"
              type="text"
              placeholder="Phone Number (018XXXXXXXX)"
              passEye={false}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <div className="flex flex-col gap-0 w-full relative">
                <span className="text-[8px] md:text-[10px] bg-base-100 py-[2px] px-2 ml-2 border-secondary border-[1px] rounded-t-md w-fit border-b-0">
                  Gender
                </span>
                <div className="flex gap-2 md:gap-3 border-secondary items-center justify-center md:justify-start border-[1px] rounded-md p-2 w-full bg-base-100">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="radio radio-secondary"
                  />
                  <span className="opacity-80">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="radio radio-secondary"
                  />
                  <span className="opacity-80">Female</span>
                </div>
              </div>
              <div className="flex flex-col gap-0 w-full relative">
                <span className="text-[8px] md:text-[10px] bg-base-100 py-[2px] px-2 ml-2 border-secondary border-[1px] rounded-t-md w-fit border-b-0">
                  Home Division
                </span>
                <select
                  defaultValue="Division"
                  name="division"
                  className="select select-secondary focus-within:outline-offset-0"
                >
                  <option disabled={true}>Division</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Khulna</option>
                  <option>Rajshahi</option>
                  <option>Shylat</option>
                  <option>Rongpur</option>
                  <option>Borishal</option>
                  <option>Maimonshing</option>
                </select>
              </div>
            </div>

            <Input
              name="email"
              label="Email *"
              type="email"
              placeholder="Email"
              passEye={false}
              req={true}
            />
            <Input
              name="password"
              label="Password *"
              type="password"
              placeholder="Password"
              passEye={true}
              req={true}
            />
            <label className="label w-full pl-2 py-2">
              <input name="terms" type="checkbox" className="checkbox" />
              Accept{" "}
              <Link
                to={"/terms"}
                className="hover:underline hover:text-secondary underline"
              >
                Terms & Conditions
              </Link>
            </label>
            <Button label="Register" />
          </form>
          <div className="divider divider-secondary my-5">OR</div>
          <button
            onClick={handleGoogle}
            className="h-12 w-full px-5 rounded-md flex justify-center items-center gap-2 border-[1px] border-secondary text-xl font-semibold hover:bg-secondary hover:text-white transition-all duration-500 ease-in-out cursor-pointer bg-base-100"
          >
            <span className="w-8 h-8 flex bg-base-100 rounded-full justify-center items-center ">
              <FcGoogle />
            </span>{" "}
            <span className="text-shadow-xs">Login with Google</span>
          </button>
          <p className="text-center mt-4">
            have an account?
            <Link to="/signin" className="text-primary font-semibold ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </Container>
  );
}

import React, { useContext, useEffect } from "react";
import Input from "../customs/Input";
import Button from "../customs/Button";

import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { FirebaseContext } from "../providers/Context";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import Container from "../customs/Container";
import SectionHead from "../customs/SectionHead";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ForgetPass from "../components/ForgetPass";

export default function Login() {
  const { signInUser, user, loading, googleSignIn, setLoading } =
    useContext(FirebaseContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password)
      return toast("Please enter your email and password.");

    signInUser(email, password)
      .then(() => {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1200,
        });
        navigate(location.state || "/", { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === "auth/invalid-credential") {
          toast.error("Email or password is incorrect.");
        }
      });
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
        "${import.meta.env.VITE_SERVER_URL}/add-user",
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
      <section className="grid md:grid-cols-2 gap-2 items-center w-full lg:w-11/12 mx-auto">
        <div>
          <SectionHead title="Login" subtitle="Login to your account" />

          <div className="flex flex-col justify-center items-center md:py-2">
            <DotLottieReact src="../assets/login.lottie" loop autoplay />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-[1px] border-gray-400 rounded-2xl px-4 py-4 lg:px-6 lg:py-8">
          <form
            className="flex flex-col justify-center items-center w-full gap-5  "
            onSubmit={handleLogIn}
          >
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              passEye={true}
            />
            <ForgetPass/>
            <Button label="Login" />
          </form>
          <p className="text-center mt-4">
            Don't have an account?
            <Link to="/register" className="text-primary font-semibold ml-1">
              Join Us
            </Link>
          </p>
          {/* Google */}
          <div className="divider divider-secondary my-3">OR</div>
          <button
            onClick={handleGoogle}
            className="h-12 w-full px-5 rounded-md flex justify-center items-center gap-2 border-[1px] border-secondary text-xl font-semibold hover:bg-secondary hover:text-white transition-all duration-500 ease-in-out cursor-pointer bg-base-100"
          >
            <span className="w-8 h-8 flex bg-base-100 rounded-full justify-center items-center ">
              <FcGoogle />
            </span>
            <span className="text-shadow-xs">Login with Google</span>
          </button>
        </div>
      </section>
    </Container>
  );
}

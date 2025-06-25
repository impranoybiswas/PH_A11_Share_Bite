import React, { useContext } from "react";
import Container from "../customs/Container";
import SectionHead from "../customs/SectionHead";
import Input from "../customs/Input";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../customs/Button";
import toast from "react-hot-toast";
import { FirebaseContext } from "../providers/Context";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function AddFood() {
  const { user } = useContext(FirebaseContext);
  const handleAddFood = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);

    const validImage = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (!validImage.test(formData.image_url))
      return toast.error("Image URL must end with .jpg, .jpeg, or .png");

    const vaildNumber = /^01[3-9]\d{8}$/;
    if (!vaildNumber.test(formData.contact)) return toast.error("Invalid phone number");

    const addData = { author: user.email, ...formData, status: "Available", order_by: { user: null, location: null, time: null }  };

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/add-food`, addData);
      e.target.reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Food Item Posted Successfully.",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center md:sticky md:top-14">
          <DotLottieReact src="../assets/add-food.lottie" loop autoplay />
        </div>
        <div className="flex flex-col justify-center items-center bg-base-200 shadow-sm rounded-lg p-4 border-[1px] border-secondary">
          <form
            onSubmit={handleAddFood}
            className="w-full flex flex-col items-center justify-center gap-3"
          >
            <SectionHead title="Add Food" subtitle="Add food to your menu" />
            <Input
              name="name"
              label="Food Name"
              type="text"
              placeholder="Food Name"
              req={true}
            />
            <Input
              name="image_url"
              label="Image URL"
              type="text"
              placeholder="URL (.jpg, .jpeg, .png, .gif, .webp)"
              req={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end w-full">
            <div className="flex flex-col gap-0 w-full relative">
            <span className="text-[8px] md:text-[10px] bg-base-100 py-[2px] px-2 ml-2 border-secondary border-[1px] rounded-t-md w-fit border-b-0">
            Category
            </span>
            <select defaultValue="Category" name="category" className="select select-secondary focus-within:outline-offset-0">
            <option disabled={true}>Category</option>
            <option>Rice Item</option>
            <option>Curry Item</option>
            <option>Fast Food</option>
            <option>Fruits</option>
            <option>Drinks</option>
            </select>
            </div>
            <Input 
                name="expired_date"
                label="Expired Date"
                type="date"
                req={true}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end w-full">
              <Input
                name="quantity"
                label="Quantity (Person)"
                type="number"
                placeholder="Quantity"
                req={true}
              />
              <Input
              name="contact"
              label="Contact"
              type="text"
              placeholder="Contact Number (01XXXXXXXXX)"
              req={true}
            />
            </div>
            <Input
              name="pickup_location"
              label="Pickup Location"
              type="text"
              placeholder="Full Location Adress"
              req={true}
            />
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-[8px] md:text-[10px] bg-base-100 py-[2px] px-2 ml-2 border-secondary border-[1px] rounded-t-md w-fit border-b-0">
                Comments <span className="opacity-60">(Optional)</span>
              </legend>
              <textarea
              name="comment"
                className="textarea textarea-secondary h-24 w-full focus-within:outline-offset-0"
                placeholder="Information about this foods."
              ></textarea>
            </fieldset>
            <Button label="Add this item" />
          </form>
        </div>
      </section>
    </Container>
  );
}

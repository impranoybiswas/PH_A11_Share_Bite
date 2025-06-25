import React from "react";
import SectionHead from "../customs/SectionHead";
import Input from "../customs/Input";
import { FaEdit } from "react-icons/fa";
import Button from "../customs/Button";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import useMyFoods from "../hooks/useMyFoods";

export default function UpdateFood({ item }) {
  const { _id, name, image_url, pickup_location, comment, status } = item;

  const { refetch } = useMyFoods();

  const handleUpdateFood = (e, id) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);
    const updateData = {
      name: formData.name,
      image_url: formData.image_url,
      pickup_location: formData.pickup_location,
      comment: formData.comment,
      status: formData.status,
    };
    axios
      .patch(`${import.meta.env.VITE_SERVER_URL}/update-food/${id}`, updateData)
      .then(() => {
        toast.success("Updated Successfully");
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
    refetch();
    document.getElementById("update_food").close();
    window.location.reload();
  };

  return (
    <>
      <button className="btn join-item bg-orange-200 hover:bg-orange-300 text-orange-500"
        onClick={() => document.getElementById("update_food").showModal()}
      >
        <FaEdit /> Edit
      </button>

      <dialog id="update_food" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form
            onSubmit={(e) => {
              handleUpdateFood(e, _id);
            }}
            className="w-full flex flex-col items-center justify-center gap-3"
          >
            <SectionHead
              title="Update Food Details"
              subtitle="Update your food item"
            />
            <Input
              name="name"
              label="Food Name"
              type="text"
              placeholder="Food Name"
              req={true}
              defaultValue={name}
            />
            <Input
              name="image_url"
              label="Image URL"
              type="text"
              placeholder="URL (.jpg, .jpeg, .png, .gif, .webp)"
              req={true}
              defaultValue={image_url}
            />
            <Input
              name="pickup_location"
              label="Pickup Location"
              type="text"
              placeholder="Full Location Adress"
              req={true}
              defaultValue={pickup_location}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full items-center border-[1px] border-secondary pl-3 rounded-md">
              <span>Change Status : </span>
              <select
                defaultValue={status}
                name="status"
                className="select select-ghost focus-within:outline-none"
              >
                <option>Available</option>
                <option>Not Available</option>
              </select>
            </div>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-[8px] md:text-[10px] bg-base-100 py-[2px] px-2 ml-2 border-secondary border-[1px] rounded-t-md w-fit border-b-0">
                Comments <span className="opacity-60">(Optional)</span>
              </legend>
              <textarea
                name="comment"
                className="textarea textarea-secondary h-24 w-full focus-within:outline-offset-0"
                placeholder="Information about this foods."
                defaultValue={comment}
              ></textarea>
            </fieldset>
            <Button label="Update Item" />
          </form>
          <form className="absolute top-3 right-3" method="dialog">
            <button className="btn btn-circle btn-sm">
              <IoClose size={20} />
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

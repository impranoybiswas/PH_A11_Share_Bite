import React, { useContext, useEffect, useState } from "react";
import SectionHead from "../customs/SectionHead";
import Button from "../customs/Button";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { avatarError, imageError } from "../utilities/myplaceholder";
import useAuthor from "../hooks/useAuthor";
import { FirebaseContext } from "../providers/Context";
import { Navigate, useNavigate } from "react-router";

export default function RequestFood({ item }) {
    const { user } = useContext(FirebaseContext);
    const [isOrdered, setIsOrdered] = useState(false);
  const { _id, author, name, image_url, pickup_location, status, comment, quantity, order_by } = item;

  const { authorData } = useAuthor(author);
  const { first_name, last_name, photo_url, email } = authorData;

  const navigate = useNavigate();

  useEffect(() => {
    if (order_by.user) {
      setIsOrdered(true);
    } else {
      setIsOrdered(false);
    }
  }, [order_by, user?.email]);

  const handleRequestFood = async (e, id) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const location_to = e.target.location.value;
    console.log(location_to);
    if (order_by.user === user?.email) return toast.error("You have already ordered this food");

    if (status === "Not Available") return toast.error("Food is Not Available");

    const addOrder = {
      order_by: {user: user.email, location: location_to, time : Date.now()},
      comment: comment,
      status: "Not Available"
    };
    try {
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/add-order/${id}`, addOrder);
      toast.success("Requsted Successfully");
      navigate("/available-foods");

    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to order");
    }
  };

  return (
    <>
      <Button label="Request" onClick={() => document.getElementById("request_food").showModal()} />
      <dialog id="request_food" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <SectionHead title="Request Food"/>
            
            <div className="flex flex-col items-center justify-between border-[1px] border-secondary p-2 rounded-lg">
            <img className="w-full h-50 object-cover rounded-lg border-[1px] border-gray-200 " src={image_url} alt={name} onError={imageError} />

            <div className="flex flex-col items-center gap-2 py-2">
                <span className="font-semibold text-xl">{name}</span>
                <span className="text-base-600">For 
                    <span className="font-semibold ml-1">{quantity}</span> Peoples
                </span>
                <span className="text-base-600">Location :
                    <span className="font-semibold ml-1">{pickup_location}</span>
                </span>
            </div>

            </div>

            <div className="text-secondary w-full my-4">Doneted By :</div>

            <div className="flex items-center gap-2 border-[1px] border-gray-200 p-2 rounded-lg">
                <img src={photo_url} onError={avatarError} className="w-12 h-12 object-cover rounded-full border-[1px] border-gray-200" />
                <div className="flex flex-col items-start h-12">

                    <span className="font-semibold">{first_name + " " + last_name}</span>
                    <span className="text-sm">{email}</span>

                </div>

            </div>
          <form
            onSubmit={(e) => {
              handleRequestFood(e, _id);
            }}
            className="w-full mt-4"
          >
            <input className="input w-full input-secondary z-9 focus-within:outline-offset-0 my-2" type="text" name="location" placeholder="Your Location" />
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
             <Button label={`${isOrdered ? "Ordered" : "Order Now"}`} />
          </form>
          <form className="fixed top-3 right-3" method="dialog">
            <button className="btn btn-circle btn-sm">
              <IoClose size={20} />
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

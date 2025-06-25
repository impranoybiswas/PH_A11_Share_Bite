import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../providers/Context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserEdit } from 'react-icons/fa';
import SectionHead from '../customs/SectionHead';
import Input from '../customs/Input';
import Button from '../customs/Button';
import { IoClose } from 'react-icons/io5';
import { sendEmailVerification } from 'firebase/auth';
import { BiMailSend } from "react-icons/bi";

export default function UpdateProfile() {
      const {user, dbUser, updateData} = useContext(FirebaseContext);
  
      const {first_name, last_name, photo_url, phone, gender, division, email} = dbUser;

      const [gen, setGen] = useState(gender);

      const handleChange = (e) => {
        setGen(e.target.value);
      };

      const handleUpdateUser = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form);
        const userData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          photo_url: formData.photo_url,
          phone: formData.phone,
          gender: formData.gender,
          division: formData.division,
        };

        const displayName = `${formData.first_name} ${formData.last_name}`;

        updateData(displayName, formData.photo_url);

        axios
      .patch(`${import.meta.env.VITE_SERVER_URL}/update-user/${user.email}`, userData)
      .then(() => {
        toast.success("Updated Successfully");
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
    document.getElementById("update_profile").close();
    window.location.reload();

      };

      const handleVerification = () => {
        sendEmailVerification(user).then(() => {
          toast.success("Email Varified");
        });
      };
  return (
    <div className='relative'>
    <button
      className="btn btn-primary btn-circle shadow-none absolute top-2 right-2 z-5"
      onClick={() => document.getElementById("update_profile").showModal()}
    >
      <FaUserEdit size={20} />
    </button>

    <dialog id="update_profile" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box relative">
        <form
          onSubmit={handleUpdateUser}
          className="w-full flex flex-col items-center justify-center gap-3"
        >
          <SectionHead
            title="Update User Details"
            subtitle="Update your information here."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <Input
            name="first_name"
            label="First Name"
            type="text"
            placeholder="First Name"
            passEye={false}
            req={true}
            defaultValue={first_name}
          />
          <Input
            name="last_name"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            passEye={false}
            defaultValue={last_name}
          />
        </div>
        <Input
          name="photo_url"
          label="Profile Photo"
          type="text"
          placeholder="URL (.jpg, .jpeg, .png, .gif, .webp)"
          passEye={false}
          req={true}
          defaultValue={photo_url}
        />
        <Input
          name="phone"
          label="Phone"
          type="text"
          placeholder="Phone Number (018XXXXXXXX)"
          passEye={false}
          defaultValue={phone}
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
          checked={gen === "Male"}
          onChange={handleChange}
        />
        <span className="opacity-80">Male</span>
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={gen === "Female"}
          onChange={handleChange}
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
          defaultValue={division}
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
       <div className="flex flex-wrap flex-col items-start md:items-center w-full p-3 border-[1px] border-base-300 rounded-md">
      <div className='flex flex-wrap gap-2 items-center'>
      <span className="text-xs opacity-75">Email :</span>
      <span className="font-semibold">{email}</span>
      </div>
      <div className="flex items-center mt-2 gap-2">
      <span
      className={`rounded-full px-2 py-[2px] text-xs border-[1px] flex justify-between items-center
      ${user.emailVerified ? "border-green-400 text-green-600" : "border-red-400 text-red-600"}`}
      >
      Email {user.emailVerified ? "verified" : "not verified"}
      </span>
      {user.emailVerified || (
      <span 
      data-tooltip-id="my-tooltip"
      data-tooltip-content="Send Verification Email"
      onClick={handleVerification}
      className="btn btn-secondary btn-sm"><BiMailSend size={20} /> Send Email</span>
      )}
      </div>
      </div>
        <Button label="Update Item" />
        </form>
        <form className="absolute top-3 right-3" method="dialog">
          <button className="btn btn-circle btn-sm">
            <IoClose size={20} />
          </button>
        </form>
      </div>
    </dialog>
    </div>
  )
}

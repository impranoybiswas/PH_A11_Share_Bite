import React from "react";
import Button from "../customs/Button";
import { format } from 'date-fns'
import { MdLocationPin } from "react-icons/md";
import { RxLapTimer } from "react-icons/rx";
import { IoIosPeople } from "react-icons/io";
import { useNavigate } from "react-router";
import useAuthor from "../hooks/useAuthor";
import { imageError } from "../utilities/myplaceholder";

export default function FoodCard({ food }) {
    const {author, name, image_url, pickup_location, expired_date,quantity, status} = food

    const navigate = useNavigate();

    const {authorData} = useAuthor(author);

  return <div 
  data-aos="fade-up"
     data-aos-anchor-placement="top-bottom"
  className="w-full rounded-lg flex flex-col justify-center items-center border-[1px] border-gray-200 gap-2 p-2 shadow-sm overflow-hidden hover:shadow-md cursor-pointer group transition-all duration-300 ease-in-out">
    <div className="w-full relative">
    <span className="absolute top-2 right-2 text-sm flex items-center gap-2 border-[1px] px-2 py-1 rounded-full border-green-200 bg-base-100 z-3">
        <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"/>
        <span className="relative inline-flex size-3 rounded-full bg-green-500"/>
        </span>
        <span className="pr-2 text-sm text-green-500">{status}</span>
        </span>
        <img className="w-full h-40 md:h-46 lg:h-52 rounded-lg border-[1px] border-gray-200 object-cover opacity-95 group-hover:opacity-100 z-2" src={image_url} alt={name}
        onError={imageError} />
    </div>

    <div className="flex-1 flex flex-col gap-2 relative border-[1px] w-full h-60 z-1 p-3 border-gray-200 rounded-lg overflow-hidden bg-secondary/3">
        <div className="w-45 h-45 border-40 border-secondary/8 rounded-full absolute -bottom-20 -right-20 group-hover:scale-110 transition-all duration-800"/>
        <div className="flex items-center gap-2 w-full border-b-[1px] border-gray-200 pb-3">
            <img className="w-6 h-6 object-cover rounded-full border-secondary border-[1px]" src={authorData.photo_url} alt={authorData.first_name} />
            <h1 className="font-semibold opacity-80">{authorData.first_name + " " + authorData.last_name}</h1>
        </div>
        
        <h1 className="text-xl font-semibold line-clamp-1">{name}</h1>

        <div className="line-clamp-1 flex items-center gap-2">
        <span className="w-6 h-6 flex justify-center items-center rounded-full border-[1px] border-gray-200 text-secondary"><MdLocationPin /></span>
        <span className="line-clamp-1">{pickup_location}</span>
        </div>
        
        <div className=" line-clamp-1 flex items-center gap-2">
        <span className="w-6 h-6 flex justify-center items-center rounded-full border-[1px] border-gray-200 text-secondary"><RxLapTimer /></span>
        <span className="line-clamp-1">{format(new Date(expired_date), "PPP")}</span>
        </div>

        <div className="flex items-center gap-2">
        <span className="w-6 h-6 flex justify-center items-center rounded-full border-[1px] border-gray-200 text-secondary"><IoIosPeople /></span>
        Available For<span className="font-semibold">{quantity}</span>Person
        </div>
    </div>
    <Button label="Details" onClick={() => {navigate(`/food/${food._id}`)}} />
  
  </div>;
}

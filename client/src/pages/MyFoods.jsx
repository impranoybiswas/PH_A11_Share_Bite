import React from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Container from "../customs/Container";
import SectionHead from "../customs/SectionHead";
import Swal from "sweetalert2";
import UpdateFood from "../components/UpdateFood";
import useMyFoods from "../hooks/useMyFoods";
import useAuthor from "../hooks/useAuthor";
import { avatarError } from "../utilities/myplaceholder";
import { MdDelete } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";

export default function MyFoods() {
  const { myFoods, loading, refetch } = useMyFoods();


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to delete this food item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_SERVER_URL}/delete-food/${id}`)
          .then(() => {
            refetch();
          })
          .catch((err) => {
            console.error("Delete error:", err);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (loading) return <Loading />;

  if (myFoods.length === 0)
    return (
      <Container>
        <div className="text-center text-3xl font-semibold col-span-1 md:col-span-3 border-[1px] border-gray-200 p-5 rounded-lg mt-5">
          No Item Added By You.
        </div>
      </Container>
    );

  return (
    <Container>
      <section className="w-11/12 md:w-4/5 mx-auto">
        <SectionHead title="My Foods" subtitle="List of my foods." />
        <div className="w-full flex flex-col gap-3 items-center">
          {myFoods.map((item) => (
            <MyFoodCard
              key={item._id}
              item={item}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}

const MyFoodCard = ({ item, handleDelete }) => {
  const { _id, name, image_url, pickup_location, order_by, status, expired_date } = item;
  const navigate = useNavigate();

  const { authorData } = useAuthor(order_by.user);
  const { first_name, last_name, photo_url } = authorData;

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full min-h-40 rounded-lg border-[1px] border-gray-200 p-3 shadow-sm ">
      <div className="w-full h-40 md:w-40">
      <img
        className="w-full h-full rounded-lg object-cover border-[1px] border-gray-200"
        src={image_url}
        alt={name}
      />
      </div>
      <div className="flex-1 flex-col gap-2 w-full">
        <div className="font-semibold text-xl flex items-center gap-3 mb-2">
          <span>{name}</span>
          {order_by.user && (
            <span className="text-xs px-2 rounded-full py-1 bg-orange-100 text-orange-700 border-[1px] border-orange-500">
              ORDERED
            </span>
          )}
        </div>
        <div className="opecity-80">{pickup_location}</div>
        <div className="opecity-80">
          <span>Status : </span>
          {status}
        </div>
        <div className="opecity-80">
          <span>Expire Date : </span>
          {expired_date}
        </div>
        
        { order_by.user ? (
<div className="border-[1px] border-gray-200 px-4 py-2 my-2 rounded-lg w-fit"> 
<div className="opecity-80 flex items-center flex-wrap gap-2 my-2">
          <span>Ordered By : </span>
          <div className="flex items-center gap-2 border-[1px] border-gray-200 px-2 py-1 rounded-full">
            <img className="w-5 h-5 object-cover rounded-full" src={photo_url} onError={avatarError} />
            <span className="font-semibold">{first_name} {last_name}</span>
        </div>
        </div>
        <div className="opecity-80">
          <span>Order Time : </span>
          {new Date(order_by.time).toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          })}
        </div>
        <div className="opecity-80">
          <span>Location : </span>
          {order_by.location}
        </div>
</div>
          ) : "No Order Placed"
        }
        
      </div>
    
      <div className="w-full md:w-fit flex justify-center">
      <div className="join join-horizontal md:join-vertical">
      <button 
      onClick={() => {navigate(`/food/${_id}`);}}
      className="btn join-item bg-blue-200 hover:bg-blue-300 text-blue-600">
      <BsInfoCircleFill />Info</button>
      <UpdateFood item={item} />
      <button 
      onClick={() => {handleDelete(_id);}}
      className="btn join-item bg-red-200 hover:bg-red-300 text-red-600">
        <MdDelete />Delete</button>
      </div>
      </div>
    </div>
  );
};

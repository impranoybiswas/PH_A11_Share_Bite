import React from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Container from "../customs/Container";
import SectionHead from "../customs/SectionHead";
import useMyFoods from "../hooks/useMyFoods";
import useAuthor from "../hooks/useAuthor";
import { avatarError } from "../utilities/myplaceholder";
import toast from "react-hot-toast";

export default function MyRequests() {
  const { reqFoods, loading } = useMyFoods();

  const handleRemoveRequest = async (id) => {
    const removeOrder = {
      order_by: {user: null, location: null, time : null},
      status: "Available"
    };
    try {
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/add-order/${id}`, removeOrder);
      toast.success("Requste Cancel Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to order");
    }
  }

  if (loading) return <Loading />;

  if (reqFoods.length === 0)
    return (
      <Container>
        <div className="text-center text-3xl font-semibold col-span-1 md:col-span-3 border-[1px] border-gray-200 p-5 rounded-lg mt-5">
          No Requests.
        </div>
      </Container>
    );

  return (
    <Container>
      <section className="w-11/12 md:w-4/5 lg:w-3/5 mx-auto">
        <SectionHead title="My Request Foods" subtitle="List of my requested foods." />
        <div className="w-full flex flex-col gap-3 items-center">
          {reqFoods.map((item) => (
            <MyFoodCard
              key={item._id}
              item={item}
              handleRemoveRequest={handleRemoveRequest}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}

const MyFoodCard = ({ item, handleRemoveRequest }) => {
  const { _id, author, name, image_url, pickup_location } = item;
  const { authorData } = useAuthor(author);
  const { first_name, last_name, photo_url } = authorData;

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full rounded-lg border-[1px] border-gray-200 p-3 shadow-sm items-center ">
      <img
        className="w-full h-40 md:w-40 rounded-lg object-cover border-[1px] border-gray-200"
        src={image_url}
        alt={name}
      />
      <div className="flex-1 flex-col gap-2 w-full">
        <div className="font-semibold text-xl flex items-center gap-3 mb-2">
          <span>{name}</span>
        </div>
        <div className="opecity-80">{pickup_location}</div>
        <div className="opecity-80 flex items-center gap-2 mt-2">
          <span>Doneted By : </span>
          <div className="flex items-center gap-2 border-[1px] border-gray-200 px-2 py-1 rounded-full">
            <img className="w-5 h-5 object-cover rounded-full" src={photo_url} onError={avatarError} />
            <span className="font-semibold">{first_name} {last_name}</span>
        </div>
        </div>
        
        <button 
        onClick={() => handleRemoveRequest(_id)}
        className="btn btn-secondary shadow-none text-xl w-full mt-3">Cancel Order</button>
        
      </div>
    </div>
  );
};

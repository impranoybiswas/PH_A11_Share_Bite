import React from "react";
import useFoods from "../hooks/useFoods";
import { Link, useNavigate } from "react-router";
import { imageError } from "../utilities/myplaceholder";

export default function FeatureFoods() {
  const { foods } = useFoods();

  const sortedByQuantityDesc = foods.sort(
    (a, b) => parseInt(b.quantity) - parseInt(a.quantity)
  );

  const features = sortedByQuantityDesc.slice(0, 6);
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center my-5 gap-5">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>

      <Link
        to="/available-foods"
        className="w-full md:w-fit px-8 py-2 flex justify-center items-center text-xl md:text-2xl text-secondary border-2 rounded-lg border-secondary hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out cursor-pointer my-3 font-semibold mb-10"
      >
        Check Available Foods
      </Link>
    </>
  );
}

const FeatureCard = ({ feature }) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    image_url,
    pickup_location,
    expired_date,
    quantity,
    status,
  } = feature;
  return (
    <div
      onClick={() => navigate(`/food/${_id}`)}
      data-aos="zoom-in"
      className="w-full rounded-lg flex flex-col gap-2 justify-center items-center relative overflow-hidden border-[1px] border-secondary/30 p-2 hover:shadow-sm hover:border-secondary/60 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <span
        className={`absolute top-4 right-4 text-xs font-semibold flex items-center gap-2 border-[1px] px-2 py-1 rounded-lg bg-base-100 ${
          status === "Available"
            ? "border-green-400 text-green-500"
            : "border-red-400 text-red-500"
        }`}
      >
        {status === "Available" ? "Available" : "Unavailable"}
      </span>
      <img
        className="w-full h-44 object-cover rounded-lg border-[1px] border-secondary/30 shadow-sm"
        src={image_url}
        onError={imageError}
      />
      <div
        data-aos="zoom-in"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="View Details"
        className="w-full min-h-34 bg-secondary/60 hover:bg-secondary/80 flex flex-col justify-center items-center border-[1px] border-secondary/30 rounded-lg transition-all duration-300 ease-in-out"
      >
        <h1 className="text-xl md:text-2xl font-semibold text-primary text-center">
          {name}
        </h1>
        <p className="text-base md:text-lg text-primary text-center">
          {pickup_location}
        </p>
        <p className="text-base md:text-lg text-primary text-center">
          For <span className="font-semibold">{quantity}</span> Peoples
        </p>
        <p className="text-base md:text-lg text-primary text-center">
          Expired: {expired_date}
        </p>
      </div>
    </div>
  );
};

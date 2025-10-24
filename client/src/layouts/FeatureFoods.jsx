import React from "react";
import { Link, useNavigate } from "react-router";
import useFoods from "../hooks/useFoods";
import { imageError } from "../utilities/myplaceholder";
import FavouriteButton from "../components/FavouriteButton";

export default function FeatureFoods() {
  const { foods } = useFoods();

  // Sort foods by quantity (descending)
  const features = [...foods]
    .sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity))
    .slice(0, 6);

  return (
    <section className="my-10 text-center w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {features.map((feature) => (
          <FeatureCard key={feature._id} feature={feature} />
        ))}
      </div>

      <Link
        to="/available-foods"
        className="inline-block mt-10 px-10 py-3 text-lg md:text-xl font-semibold text-secondary border-2 border-secondary rounded-lg hover:bg-secondary hover:text-white transition-all duration-300"
      >
        Check Available Foods
      </Link>
    </section>
  );
}

const FeatureCard = ({ feature }) => {
  const navigate = useNavigate();
  const { _id, name, image_url, pickup_location, expired_date, quantity, status } = feature;

  const isAvailable = status === "Available";

  return (
    <article
      onClick={() => navigate(`/food/${_id}`)}
      data-aos="zoom-in"
      className="relative w-full h-84 overflow-hidden rounded-xl border border-secondary/30 shadow-sm hover:shadow-lg hover:border-secondary/60 transition-all duration-300 cursor-pointer group"
    >
      {/* Status Badge */}
      <span
        className={`absolute top-3 right-3 z-10 px-2 py-1 text-xs font-semibold rounded-md border ${
          isAvailable
            ? "border-green-400 text-green-500 bg-base-100"
            : "border-red-400 text-red-500 bg-base-100"
        }`}
      >
        {isAvailable ? "Available" : "Unavailable"}
      </span>

      <span
        className={`absolute top-3 left-3 z-10 `}
      >
        <FavouriteButton/>
      </span>

      {/* Food Image */}
      <img
        src={image_url}
        onError={imageError}
        alt={name}
        className="w-full h-full object-cover absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end items-center bg-gradient-to-b from-transparent via-black/30 to-black/80 text-white p-5 transition-all duration-500 group-hover:via-black/50 group-hover:to-black/90">
      <span className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 scale-0 text-base group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out">View Details</span>
        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-center drop-shadow-md">
          {name}
        </h3>
        <div className="text-sm flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center opacity-90">
          <span>{pickup_location}</span>
          <span className="hidden md:inline">|</span>
          <span>Expires: {expired_date}</span>
        </div>
        <p className="mt-2 mb-3 text-sm">
          Serves <span className="font-semibold">{quantity}</span> people
        </p>
      </div>
    </article>
  );
};

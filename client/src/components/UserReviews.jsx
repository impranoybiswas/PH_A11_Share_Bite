import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Sample reviews (you can fetch these later from your backend)
const reviews = [
  {
    name: "Rafiul Islam",
    role: "Food Donor",
    review:
      "This platform helped me share leftover meals easily. I love how fast others can respond!",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sadia Ahmed",
    role: "Food Receiver",
    review:
      "Got fresh homemade food from my neighborhood within minutes. Super convenient!",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Naimul Hasan",
    role: "Volunteer",
    review:
      "The system makes food sharing effortless. I manage pickups for my area through this site.",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Rafiul Islam",
    role: "Food Donor",
    review:
      "This platform helped me share leftover meals easily. I love how fast others can respond!",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sadia Ahmed",
    role: "Food Receiver",
    review:
      "Got fresh homemade food from my neighborhood within minutes. Super convenient!",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Naimul Hasan",
    role: "Volunteer",
    review:
      "The system makes food sharing effortless. I manage pickups for my area through this site.",
    image: "https://i.pravatar.cc/100?img=8",
  },
];

export default function UserReviews() {
  return (
    <div className="px-4 md:px-10 w-full overflow-hidden">
      <Swiper

        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center h-full hover:shadow-xl transition-all duration-300 mt-5 mb-10">
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-green-500"
              />
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{review.role}</p>
              <p className="text-gray-700 italic line-clamp-2 text-sm">
                “{review.review}”
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

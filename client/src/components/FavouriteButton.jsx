import React, { useContext, useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useToggleFavorite } from "../hooks/useFavCarts";
import { FirebaseContext } from "../providers/Context";
import toast from "react-hot-toast";

export default function FavouriteButton({ productId }) {
  const { dbUser, loading: userLoading } = useContext(FirebaseContext);
  const [isFavourite, setIsFavourite] = useState(false);
  const toggleFavorite = useToggleFavorite();

  // Sync local state with user data
  useEffect(() => {
    if (dbUser?.favorites) {
      setIsFavourite(dbUser.favorites.includes(productId));
    }
  }, [dbUser?.favorites, productId]);

  // Handle click
  const handleToggle = () => {
    if (!dbUser?.email) {
      toast.error("Please log in to save favorites.");
      return;
    }

    toggleFavorite.mutate(productId, {
      onSuccess: () => {
        // Optimistic update for instant feedback
        setIsFavourite((prev) => !prev);
      },
    });
  };

  if (userLoading) {
    return (
      <div className="loading loading-ring loading-sm" aria-label="loading" />
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={userLoading}
      className="size-8 rounded-full bg-gray-200 hover:bg-gray-300 text-base flex items-center justify-center transition disabled:opacity-50 active:scale-95 cursor-pointer"
    >
      {isFavourite ? (
        <GoHeartFill className="text-red-500" />
      ) : (
        <GoHeart className="text-gray-600" />
      )}
    </button>
  );
}

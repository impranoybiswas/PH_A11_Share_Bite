// hooks/useShopHooks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "./useAxios";

/** =========================
 * ✅ Fetch all favorite products for the current user
 ========================= */

export const useFavourites = () => {
  const axiosInstance = useAxios();
  return useQuery({
    queryKey: ["favourites"], // React Query cache key
    queryFn: async () => {
      const response = await axiosInstance.get("/items/favorites/all");
      return response.data.items;
    },
    refetchInterval: 1000, // auto refresh
    staleTime: 0,
    retry: 1,
  });
};

/** =========================
 * ✅ Toggle a product in favorites (add/remove)
 ========================= */
export function useToggleFavorite() {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const res = await axiosInstance.post("/items/favorites/toggle", {
        productId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      // Show toast depending on action
      toast.success(
        data.action === "added"
          ? "Added to favorites!"
          : "Removed from favorites!"
      );
      // Refresh favourites query so UI updates
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
    onError: () => {
      toast.error("Failed to update favorites!");
    },
  });
}

/** =========================
 * ✅ Fetch all cart items for the current user
 ========================= */
export const useCarts = () => {
  const axiosInstance = useAxios();
  return useQuery({
    queryKey: ["carts"], // React Query cache key
    queryFn: async () => {
      const response = await axiosInstance.get("/items/carts/all");
      return response.data.items;
    },
    refetchInterval: 1000, // auto refresh
    staleTime: 0,
    retry: 1,
  });
};

/** =========================
 * ✅ Remove an item from the cart by productId
 ========================= */
export function useRemoveCart() {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();

  return useMutation({
    mutationFn: async (productId) => {
      const res = await axiosInstance.post("/items/carts/remove", {
        productId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Item removed from cart!");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      toast.error("Failed to remove item!");
    },
  });
}

/** =========================
 * ✅ Add, remove, or update quantity of an item in cart
 ========================= */
export function useToggleCart() {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();

  return useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const res = await axiosInstance.post("/items/carts/toggle", {
        productId,
        quantity,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cart updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      toast.error("Failed to update cart!");
    },
  });
}

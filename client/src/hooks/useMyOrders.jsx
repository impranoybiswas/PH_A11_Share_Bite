import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

export default function useMyOrders() {
  const { user, loading: authLoading } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async (email) => {
    if (!email) return; // No user yet, skip

    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/foods/order?email=${email}`
      );
      setMyOrders(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch user foods:", error);
      setMyOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user?.email) {
      fetchMyOrders(user.email);
    }
  }, [user, authLoading]);

  return {
    myOrders,
    loading,
    refetchMyFoods: () => fetchMyOrders(user?.email),
  };
}

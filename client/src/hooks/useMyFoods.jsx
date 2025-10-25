import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

export default function useMyFoods() {
  const { user, loading: authLoading } = useAuth();
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyFoods = async (email) => {
    if (!email) return; // No user yet, skip

    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/foods?author=${email}`
      );
      setMyFoods(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch user foods:", error);
      setMyFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user?.email) {
      fetchMyFoods(user.email);
    }
  }, [user, authLoading]);

  return { myFoods, loading, refetchMyFoods: () => fetchMyFoods(user?.email) };
}

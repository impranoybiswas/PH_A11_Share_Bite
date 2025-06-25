import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useFoods() {
  const [foods, setFoods] = useState([]);
  const [availableFoods, setAvailableFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/foods`);
      setFoods(res.data);
      setAvailableFoods(res.data.filter((food) => food.status === "Available"));
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return { foods, availableFoods, loading, fetchFoods };
}

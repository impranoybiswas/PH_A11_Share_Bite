import { useContext, useEffect, useState } from "react";
import useFoods from "./useFoods";
import { FirebaseContext } from "../providers/Context";

export default function useMyFoods() {
  const { user } = useContext(FirebaseContext);
  const { foods, loading: foodsLoading, fetchFoods } = useFoods();

  const [myFoods, setMyFoods] = useState([]);
  const [reqFoods, setReqFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email && !foodsLoading) {
      const filtered = foods.filter(food => food.author === user.email);
      const reqFiltered = foods.filter(food => food.order_by.user === user.email);
      setMyFoods(filtered);
      setReqFoods(reqFiltered);
      setLoading(false);
    }
  }, [foods, user, foodsLoading]);

  return { myFoods, reqFoods, loading, refetch: fetchFoods };
}
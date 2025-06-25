import axios from "axios";
import { useEffect, useState } from "react";

export default function useAuthor(author) {
  const [authorData, setAuthorData] = useState({});
  const [authorLoading, setAuthorLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!author) return;
    setAuthorLoading(true);
    setError(null);

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/users?email=${author}`)
      .then((response) => {
        setAuthorData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setAuthorLoading(false);
      });
  }, [author]);

  return { authorData, authorLoading, error };
}

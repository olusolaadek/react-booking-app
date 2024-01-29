import { useEffect, useState } from "react";

export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(url);
        const result = await data.json();

        setData(result);
      } catch (ex) {
        setError(ex.message);
      }
    }
    fetchData();
  }, [url]);
  return [data, error];
}

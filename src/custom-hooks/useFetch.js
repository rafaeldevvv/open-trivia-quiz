import { useEffect, useState } from "react";

export default function useFetch(url = "") {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    function fetchData() {
      setIsLoading(true);
      fetch(url)
        .then((response) => {
          if (response.ok) {
            if (!ignore) return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((data) => {
          if (!ignore) {
            setResult(data);
            setIsLoading(false);
          }
        })
        .catch((reason) => {
          setError(reason);
          setIsLoading(false);
        });
    }

    fetchData();
    return () => {
      ignore = true;
      setIsLoading(false);
    };
  }, [url]);

  return [result, isLoading, error];
}

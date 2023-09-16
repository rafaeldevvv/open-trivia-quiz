import { useEffect, useState } from "react";
import reportError from "../utils/reportError";

export default function useFetch(url = "") {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    function fetchData() {
      setIsLoading(true);
      fetch(url)
        .then((response) => {
          if (response.status <= 299) {
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
        .catch(reportError);
    }

    fetchData();
    return () => {
      ignore = true;
      setIsLoading(false);
    };
  }, [url]);

  return [result, isLoading];
}

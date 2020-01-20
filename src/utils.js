import { useState, useEffect } from "react";

export function formatDate(date) {
  let dd = new Date(date);
  return (
    dd.getDate() + "/" + (Number(dd.getMonth()) + 1) + "/" + dd.getFullYear()
  );
}

export function useFetch(url, method) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(url, { method });
      if (resp.ok) {
        setResponse(await resp.json());
      } else {
        setError(resp.error);
      }
    };
    fetchData();
  }, [url, method]);
  return [response, error];
}

export const INPUTWIDTH = 175;

export const DEFAULTCOLOR = "#0040ff";

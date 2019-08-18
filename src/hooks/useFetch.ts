import { useState, useEffect } from "react";

const requestTimeBeforePending = 600;

function useFetchData<T>(func: () => Promise<T>) {
  const [pending, setPending] = useState(false);
  const [delayedPending, setDelayedPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([] as T[]);
  useEffect(() => {
    async function fetchData() {
      setPending(true);
      setSuccess(false);
      setError(false);
      const timeoutRef = setTimeout(() => {
        setDelayedPending(true);
      }, requestTimeBeforePending);

      try {
        await func();
        clearTimeout(timeoutRef);
        setSuccess(true);
        setPending(false);
        setData(data as T[]);
      } catch (err) {
        clearTimeout(timeoutRef);
        setError(true);
        setPending(false);
      }
    }
    fetchData();
  });
  return {
    data,
    pending,
    delayedPending,
    error,
    success
  };
}

export { useFetchData };

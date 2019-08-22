import { useEffect, useState } from "react";
import { WhereFilterOp } from "../types";

import { firebase } from "../firebaseSetup";

const requestTimeBeforePending = 600;
const db = firebase.firestore();

function useFetchCollection<T>(
  collection: string,
  filter?: { fieldPath: string; opStr: WhereFilterOp; value: string | boolean }
) {
  const [pending, setPending] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([] as T[]);
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    async function fetchCollection() {
      setError(false);
      setSuccess(false);
      const timeoutRef = setTimeout(() => {
        setPending(true);
      }, requestTimeBeforePending);

      let ref: any = db.collection(collection);
      if (filter) {
        ref = ref.where(filter.fieldPath, filter.opStr, filter.value);
      }

      try {
        const response = await ref.get();
        const data = response.docs.map((x: any) => ({
          id: x.id,
          ...x.data()
        }));

        clearTimeout(timeoutRef);
        setSuccess(true);
        setPending(false);
        setData(data as T[]);
      } catch (error) {
        clearTimeout(timeoutRef);
        setError(true);
        setPending(false);
      }
    }
    if (!isCanceled) {
      fetchCollection();
    }
    return () => setIsCanceled(true);
  }, [collection, filter, isCanceled]);
  const state = { pending, error, success };
  return [data, state] as [
    T[],
    { pending: boolean; error: boolean; success: boolean }
  ];
}

export { useFetchCollection };

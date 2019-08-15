import { useEffect, useState } from "react";
import { WhereFilterOp } from "../types";

import { firebase } from "../firebase";

const db = firebase.firestore();

function useFetchCollection<T>(
  collection: string,
  filter?: { fieldPath: string; opStr: WhereFilterOp; value: string }
) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([] as T[]);

  useEffect(() => {
    async function fetchCollection() {
      setError(false);
      setSuccess(false);
      const timeoutRef = setTimeout(() => {
        setPending(true);
      }, 400);

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
    fetchCollection();
  }, [collection, filter]);
  return [data, pending, error, success] as [T[], boolean, boolean, boolean];
}

export { useFetchCollection };

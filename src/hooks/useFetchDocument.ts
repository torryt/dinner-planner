import { useEffect, useState } from "react";
import { WhereFilterOp } from "../types";

import { firebase } from "../firebase";

const db = firebase.firestore();

function useFetchDocument<T>(collection: string, document: string) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(undefined as T | undefined);

  useEffect(() => {
    async function fetchDocument() {
      setError(false);
      setSuccess(false);
      const timeoutRef = setTimeout(() => {
        setPending(true);
      }, 400);

      let ref = db.collection(collection).doc(document);

      try {
        const doc = await ref.get();
        if (doc.exists) {
          clearTimeout(timeoutRef);
          setSuccess(true);
          setPending(false);
          setData(doc.data() as T);
        } else {
          throw Error(`No document matching id ${document}`);
        }
      } catch (error) {
        clearTimeout(timeoutRef);
        setError(true);
        setPending(false);
      }
    }
    fetchDocument();
  }, [collection, document]);
  return [data, pending, error, success] as [
    T | undefined,
    boolean,
    boolean,
    boolean
  ];
}

export { useFetchDocument };

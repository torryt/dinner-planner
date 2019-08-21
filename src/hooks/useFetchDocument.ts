import { useEffect, useState } from "react";
import { firebase } from "../firebase";

const requestTimeBeforePending = 600;
const db = firebase.firestore();

interface FetchState {
  pending: boolean;
  error: boolean;
  success: boolean;
}
function useFetchDocument<T>(collection: string, document: string) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(undefined as T | undefined);
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    async function fetchDocument() {
      setError(false);
      setSuccess(false);
      const timeoutRef = setTimeout(() => {
        setPending(true);
      }, requestTimeBeforePending);

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
    if (!isCanceled) {
      fetchDocument();
    }
    return () => setIsCanceled(true);
  }, [collection, document, isCanceled]);
  const state = { pending, error, success };
  return [data, state] as [T | undefined, FetchState];
}

export { useFetchDocument };

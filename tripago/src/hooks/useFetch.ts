import { useState, useEffect, useCallback, useRef } from "react";
import { RoomPrice } from "../types/RoomPrice.model";

const useFetch = (url: string, OPTIONS: { type: string }) => {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);

    // use useRef to wrap a function or an object/array that's a useEffect dependency
    // React memozies ALL VALUES so that prevValue can be available, but it sees obj/arr as func's.
    const _options = useRef(OPTIONS).current; // this wraps the obj as a reference value, due to React's nice quirks

    // React-ified const and function for useEffect to work
    const [data, setData] = useState([] as RoomPrice[]);
    const fetchData = useCallback(
        async (controller: AbortController) => {
            const tripsObj = await fetch(url, { signal: controller.signal });
            if (!tripsObj.ok) {
                // throws an error if the function doesn't have proper requirements to proceed
                // CAUGHT IN USEEFFECT HOOK
                throw new Error(tripsObj.statusText);
            }
            const trips = await tripsObj.json();
            setData(trips);

            // abort controller, aborts async call on user departure of page
            return () => { controller.abort(); }
        },
        [url]
    );

    useEffect(
        () => {
            console.log(OPTIONS)
            const abortController = new AbortController();
            try {
                setIsPending(true); // is currently waiting for resource retrieval
                fetchData(abortController);
                setIsPending(false); // resource retrieval complete
                setError('');
            }
            catch (err: unknown) {
                if ((err as { name: string }).name === "AbortError") console.log('The fetch request was aborted!');
                else console.log((err as { message: string }).message);
                setError("Unable to fetch data!");
                setIsPending(false); // resource retrieval complete
            }
        },
        [url, fetchData, _options]
    );

    // returns the object from the hook, this is required for the hook to work.
    return { data, isPending, error };
}

export default useFetch;
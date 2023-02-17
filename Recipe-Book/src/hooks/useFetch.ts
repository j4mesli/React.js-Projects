import { useState, useEffect } from "react"
import { Recipe } from "../types/Recipe.model";

export const useFetch = (url: string, method = "GET") => {
  const [data, setData] = useState<unknown>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>();
  const [options, setOptions] = useState<{ method: "POST", headers: { "Content-Type": string, charset: string }, body: string } | undefined>();

  const postData = (postData: Recipe) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "UTF-8",
      },
      "body": JSON.stringify(postData),
    });
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions?: typeof options) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(undefined)
      } catch (err) {
        if ((err as { name: string }).name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    if (method === "GET") 
      fetchData();
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort()
    }

  }, [url]);


  return { data, isPending, error, postData }
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { IPost } from "../types/post.types";

const fetchData = async () => {
  const URL = "https://jsonplaceholder.typicode.com/posts";

  return axios.get<IPost[]>(URL);
};

const initialData: { data: IPost[] } = {
  data: [
    {
      title: "Hello World!",
      id: 1,
      userId: "1",
      body: "This is body!",
    },
  ],
};

export function usePosts(isAuth: boolean) {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    select: (data) => data.data,
    enabled: isAuth,
    initialData: initialData,
  });

  useEffect(() => {
    if (isSuccess) console.log("Data fetched successfully!");
  }, [isSuccess, data]);
  useEffect(() => {
    if (isError) console.log("Error fetching data!");
  }, [isError]);

  return { data, isSuccess, isError };
}

export default usePosts;

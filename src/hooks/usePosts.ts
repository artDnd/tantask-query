import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { IData } from "../types/post.types";

const fetchData = async () => {
  const URL = "https://jsonplaceholder.typicode.com/posts/";

  return axios.get<IData[]>(URL);
};

export function usePosts(isAuth: boolean) {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
    select: (data) => data.data,
    enabled: isAuth,
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

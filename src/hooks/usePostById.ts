import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { IData } from "../types/post.types";

const fetchData = async (id: number) => {
  const URL = "https://jsonplaceholder.typicode.com/posts/";
  return axios.get<IData>(`${URL}${id}`);
};

export function usePostById(id: number) {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchData(id),
    select: (data) => data.data,
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) console.log("Data fetched successfully!");
  }, [isSuccess, data]);
  useEffect(() => {
    if (isError) console.log("Error fetching data!");
  }, [isError]);

  return { data, isSuccess, isError };
}

export default usePostById;

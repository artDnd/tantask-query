import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IPost } from "../types/post.types";

const fetchData = async (id: number) => {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  return axios.get<IPost>(`${URL}/${id}`);
};

export function usePostById(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchData(id),
    select: (data) => data.data,
    enabled: !!id,
  });

  return { post: data, isLoading };
}

export default usePostById;

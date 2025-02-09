import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IPost } from "../types/post.types";
import { postService } from "../services/post.service";

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
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: postService.getPosts,
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

  return { data, isSuccess, isError, isLoading };
}

export default usePosts;

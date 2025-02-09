import { useQuery } from "@tanstack/react-query";
import { postService } from "../services/post.service";

export function usePostById(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => postService.getPostById(id),
    select: (data) => data.data,
    enabled: !!id,
  });

  return { post: data, isLoading };
}

export default usePostById;

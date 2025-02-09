import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "../services/post.service";

function usePostCreated() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["add post"],
    mutationFn: postService.createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
  return { isPending, mutate };
}

export default usePostCreated;

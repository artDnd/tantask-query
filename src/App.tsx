import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePostById from "./hooks/usePostById";
import usePosts from "./hooks/usePosts";
import axios from "axios";
import { IPost } from "./types/post.types";

const isAuth = true;
function App() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["add post"],
    mutationFn: async (newPost: Omit<IPost, "id">) =>
      axios.post("https://jsonplaceholder.typicode.com/posts", newPost),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const { data } = usePosts(isAuth);
  const { post, isLoading } = usePostById(1);
  console.log(post);
  return (
    <>
      <div>
        <button
          disabled={isPending}
          onClick={() =>
            mutate({ body: "New Body", userId: "1", title: "Hello Post" })
          }
        >
          {isPending ? "Loading..." : "Create"}
        </button>

        {isLoading
          ? "Is Loading..."
          : data?.length
          ? data.map((post) => <p key={post.id}>{post.title}</p>)
          : "Not found"}
      </div>
    </>
  );
}

export default App;

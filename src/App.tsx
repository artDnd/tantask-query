import usePostCreated from "./hooks/usePostCreated";
import usePosts from "./hooks/usePosts";

const isAuth = true;
function App() {
  const { data, isLoading } = usePosts(isAuth);
  const { isPending, mutate } = usePostCreated();
  // const { post, isLoading } = usePostById(1);
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

import usePostById from "./hooks/usePostById";
import usePosts from "./hooks/usePosts";

function App() {
  const isAuth = true;
  const { data, isSuccess } = usePosts(isAuth);
  const post = usePostById(1);
  console.log(post.data);

  return (
    <>
      <div>
        {isSuccess
          ? data?.map((post) => <p key={post.id}>{post.title}</p>)
          : "Error!"}
      </div>
    </>
  );
}

export default App;

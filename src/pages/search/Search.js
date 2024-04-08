import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

// components
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

export const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div>
      <p>Results for: {search}</p>
      <div>
        {posts && posts.length === 0 && (
          <>
            <p>Results not found...</p>
            <Link to="/">Back</Link>
          </>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

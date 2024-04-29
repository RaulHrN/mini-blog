import "./Search.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

// components
import { PostDetail } from "../../components/post-detail/PostDetail.component";
import { Link } from "react-router-dom";

export const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className="page-container">
      <p className="page-title">Results for: {search}</p>
      <div className="search-results">
        {posts && posts.length === 0 && (
          <div className="search_not-found">
            <p>Results not found...</p>
            <Link to="/">Back</Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

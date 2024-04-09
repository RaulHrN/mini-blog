// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// Components
import { PostDetail } from "../../components/post-detail/PostDetail.component";

export const HomePage = () => {
  const { documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div>
      <h1>Take a look on our recent posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div className="post-list">
        {loading && <p>Loading...</p>}
        {posts && posts.length === 0 && (
          <div>
            <p>Posts not found</p>
            <Link to="/posts/create">Create first post</Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

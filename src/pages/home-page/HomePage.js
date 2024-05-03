import "./HomePage.css";

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
    <div className="page-container">
      <div className="home-header">
        <p className="page-title">Take a look on our recent posts</p>
        <form onSubmit={handleSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search for tags..."
            className="search-bar_input"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn">Search</button>
        </form>
      </div>
      <div className="post-list">
        {loading && <p className="loading">Loading...</p>}
        {posts && posts.length === 0 && (
          <div className="post-list_not-found">
            <p>Posts not found</p>
            <Link to="/posts/create" className="create-post-link">
              Create first post
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

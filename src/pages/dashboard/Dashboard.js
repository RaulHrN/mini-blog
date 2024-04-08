import { Link } from "react-router-dom";

import { useAuthValue } from "../../contexts/auth-context";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

export const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts } = useFetchDocument("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  return (
    <div className="page-container">
      <p className="page-title">Dashboard</p>
      <p>Manage your posts</p>
      {posts && posts.length === 0 ? (
        <div>
          <p>Posts not founds</p>
          <Link to="/posts/create" className="button">
            Create first post
          </Link>
        </div>
      ) : (
        <div>
          <span>Title</span>
          <span>Actions</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
            <div>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Open
              </Link>
              <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                Edit
              </Link>
              <button
                onClick={() => deleteDocument(post.id)}
                className="btn btn-outline btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

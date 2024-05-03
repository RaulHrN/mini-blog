import "./Dashboard.css"

import { Link } from "react-router-dom";

import { useAuthValue } from "../../contexts/auth-context";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

export const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  return (
    <div className="page-container">
      <p className="page-title">Dashboard</p>
      {posts &&
        posts.map((post) => (
          <div key={post.id} className="dashboard-post">
            <h2>{post.title}</h2>
              <Link to={`/posts/${post.id}`} className="btn">
                Open
              </Link>
              <Link to={`/posts/edit/${post.id}`} className="btn">
                Edit
              </Link>
              <button onClick={() => deleteDocument(post.id)} className="btn">
                Delete
              </button>
            </div>
        ))}
    </div>
  );
};

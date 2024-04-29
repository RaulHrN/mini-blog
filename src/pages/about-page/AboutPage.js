import { Link } from "react-router-dom";

export const AboutPage = () => {
  return (
    <div className="page-container">
      <p className="page-title">About the Mini Blog</p>
      <p style={{ color: "#fffcf2", fontWeight: 700, fontSize: "2rem" }}>
        This project consist on create a blog using React and Firebase
      </p>
      <Link to="/posts/create" className="create-post-link">
        Create post
      </Link>
    </div>
  );
};

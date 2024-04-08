import { Link } from "react-router-dom";

export const AboutPage = () => {
  return (
    <div className="page-container">
      <p className="page-title">About the Mini Blog</p>
      <p>This project consist on create a blog using React and Firebase</p>
      <Link to="/posts/create" className="link-button">
        Create post
      </Link>
    </div>
  );
};

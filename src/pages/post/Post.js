import "./Post.css";

import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";

export const Post = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  return (
    <div className="post-container">
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p className="post-content">{post.body}</p>
          <h3>This post is about:</h3>
          <div className="tags" style={{color: "#fffcf2"}}>
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

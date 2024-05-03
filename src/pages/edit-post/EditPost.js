import "./EditPost.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

export const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  // States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  // Effects
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tags.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // Create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
    };

    updateDocument(id, data);

    // Redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className="page-container">
      {post && (
        <>
          <h2 className="page-title">Editing post: {post.title}</h2>
          <form className="form-container edit-post-form" onSubmit={handleSubmit}>
            <label className="form-label">
              <p>Title:</p>
              <input
                type="text"
                name="text"
                required
                placeholder="A good title..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label className="form-label">
              <p>Image URL:</p>
              <input
                type="text"
                name="image"
                required
                placeholder="Insert a image that represents your post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
              <img src={post.image} alt={post.title} />

            <label className="form-label">
              <p>Content:</p>
              <textarea
                name="body"
                required
                placeholder="Insert post content"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label className="form-label">
              <p>Tags:</p>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insert tags separated by commas"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Edit</button>}
            {response.loading && (
              <button className="btn" disabled>
                Wait...
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

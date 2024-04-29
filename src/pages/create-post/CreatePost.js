import "./CreatePost.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../contexts/auth-context";

export const CreatePost = () => {
  // States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  // Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("The image must be a URL.");
    }

    // Create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Check values
    if (!title || !image || !tags || !body) {
      setFormError("Please, fill in all fields!");
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div className="page-container">
      <p className="page-title">Create post</p>

      <form onSubmit={handleSubmit} className="create-post_form">
        <label>
          <p>Title:</p>
          <input
            className="form-input"
            required
            type="text"
            name="text"
            placeholder="A good title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <p>Image URL:</p>
          <input
            className="form-input"
            required
            type="text"
            name="image"
            placeholder="Insert image url..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          <p>Content:</p>
          <textarea
            className="form-input"
            required
            name="body"
            placeholder="insert post content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        <label>
          <p>Tags:</p>
          <input
            className="form-input"
            required
            type="text"
            name="tags"
            placeholder="Insert tags separated by commas"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        {!response.loading && <button className="submit-btn">Create post</button>}
        {response.loading && <button className="submit-btn" disabled>Waiting...</button>}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/authContext";
import dynamic from "next/dynamic";
import LoadingImg from "../public/img/Rolling.svg";

import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Router, { useRouter } from "next/router";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const Write = () => {
  const { currentUser } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [post, setPost] = useState([]);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [cat, setCat] = useState("");
  const router = useRouter();
  const { edit } = router.query;

  const uploadImage = async (image) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "yb6n3q4u");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dgip4oxeg/image/upload",
        formData
      );
      setImageUrl(res.data.secure_url);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/posts/create", {
        title: title,
        desc: value,
        img: imageUrl,
        cat: cat,
        uid: currentUser._id,
      });
      const data = res.data;
      setIsLoading(false);
      console.log(data.message);
    } catch (error) {
      console.log(error.response.message);
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(`/api/posts/updatePost/${edit}`, {
        title: title,
        desc: value,
        img: imageUrl,
        cat: cat,
        uid: currentUser._id,
      });
      const data = await res.data;
      console.log(data.response);
      setIsLoading(false);
      router.replace("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const handleEdit = async () => {
    setIsEditing(true);
    try {
      const res = await axios.get(`/api/posts/getPost/${edit}`);
      const data = await res.data;
      setTitle(data.finalData.title);
      setPost(data.finalData);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    if (edit) handleEdit();
  }, [edit]);

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={isEditing ? post.desc : value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            onChange={(e) => uploadImage(e.target.files)}
          />
          <label className="file" htmlFor="file">
            Upload Image{"  "}
            {isUploading && <img src={LoadingImg.src} />}
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={isEditing ? handleUpdate : handleSubmit}>
              {isLoading ? (
                <img src={LoadingImg.src} />
              ) : isEditing ? (
                "Update"
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="category">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Science</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="cat"
              value="sports"
              id="sports"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Sports</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="cat"
              value="gaming"
              id="gaming"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Gaming</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Technology</label>
          </div>
          <div className="category">
            <input
              type="radio"
              name="cat"
              value="movies"
              id="movies"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Movies</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;

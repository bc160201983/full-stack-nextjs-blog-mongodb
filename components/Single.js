import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Image from "next/future/image";
import Link from "next/link";
import Menu from "./Menu";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment/moment";
import ReactHtmlParser from "react-html-parser";
import { useGlobalContext } from "../context/authContext";

const Single = () => {
  const { currentUser } = useGlobalContext();

  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const getPost = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/posts/getPost/${id}`);
      const data = await res.data;
      setIsLoading(false);
      setPost(data.finalData);
      // console.log(data.final);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/deletePost/${id}`);
      router.replace("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <div className="single">
      <div className="content">
        {isLoading ? (
          <Skeleton
            width={695}
            height={300}
            variant="rectangular"
            animation="wave"
          />
        ) : (
          <Image width={695} height={300} layout="fill" src={post.img} alt="" />
        )}

        {/* <Image src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" /> */}
        <div className="user">
          <Image
            width={50}
            height={50}
            layout="fill"
            src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />

          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>

          {currentUser?._id === post?.uid && (
            <div className="edit">
              <Link href={`/write?edit=${post._id}`}>
                <Image
                  width={50}
                  height={50}
                  layout="fill"
                  src={"/img/edit.png"}
                  alt=""
                />
              </Link>
              <Image
                onClick={handleDelete}
                width={50}
                height={50}
                layout="fill"
                src={"/img/delete.png"}
                alt=""
              />
            </div>
          )}
        </div>
        {isLoading ? <Skeleton variant="h1" /> : <h1>{post.title}</h1>}

        <div>{ReactHtmlParser(post.desc)}</div>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  );
};

export default Single;

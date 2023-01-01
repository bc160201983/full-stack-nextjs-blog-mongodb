import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import Image from "next/future/image";
import ReactHtmlParser from "react-html-parser";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { cat } = router.query;

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const res = cat
        ? await axios.get(`/api/posts/getPosts?cat=${cat}`)
        : await axios.get(`/api/posts/getPosts`);
      const data = await res.data;
      setIsLoading(false);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div key={post.id} className="post">
              {isLoading ? (
                <Skeleton width={100} height={400} variant="rectangular" />
              ) : (
                <div className="img">
                  <Image
                    unoptimized={true}
                    layout="fill"
                    object-fit="cover"
                    width={100}
                    height="400"
                    alt={post.title}
                    src={post?.img}
                  />
                </div>
              )}

              <div className="content">
                {isLoading ? (
                  <Skeleton variant="h1" />
                ) : (
                  <Link href={`/post/${post._id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                )}

                {isLoading ? (
                  <Skeleton variant="text" width={550} height={150} />
                ) : (
                  <p>{ReactHtmlParser(post.desc)}</p>
                )}

                <Link href={`/post/${post._id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

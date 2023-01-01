import axios from "axios";
import Image from "next/future/image";
import ReactHtmlParser from "react-html-parser";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { cat } = router.query;

  const getPosts = async () => {
    const res = cat
      ? await axios.get(`/api/posts/getPosts?cat=${cat}`)
      : await axios.get(`/api/posts/getPosts`);
    const data = await res.data;
    setPosts(data.posts);
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
              <div className="img">
                <Image
                  unoptimized={true}
                  layout="fill"
                  object-fit="cover"
                  width={100}
                  height="400"
                  alt={post.title}
                  src={`${
                    post?.img ||
                    "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }`}
                />
              </div>
              <div className="content">
                <Link href={`/post/${post._id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{ReactHtmlParser(post.desc)}</p>
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

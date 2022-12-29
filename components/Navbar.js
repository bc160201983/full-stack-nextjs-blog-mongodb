import React from "react";
import Logo from "../public/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useGlobalContext();
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link href={"/"}>
            <Image src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <Link href={"/?cat=art"} passhref>
            <a className="link">Art</a>
          </Link>
          <Link href={"/?cat=science"}>
            <a className="link">science</a>
          </Link>
          <Link href={"/?cat=sports"}>
            <a className="link">sports</a>
          </Link>
          <Link href={"/?cat=gaming"}>
            <a className="link">gaming</a>
          </Link>
          <Link href={"/?cat=technology"}>
            <a className="link">technology</a>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link href="/login">
              <a className="link">Login</a>
            </Link>
          )}
          {currentUser && (
            <Link href={"/write"}>
              <span className="write">
                <a className="link">Write</a>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

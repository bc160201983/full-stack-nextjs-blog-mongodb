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
            <Image src={Logo} />
          </Link>
        </div>
        <div className="links">
          <Link href={"/?cat=art"}>
            <h6 className="link">Art</h6>
          </Link>
          <Link href={"/?cat=art"}>
            <h6 className="link">science</h6>
          </Link>
          <Link href={"/?cat=art"}>
            <h6 className="link">sports</h6>
          </Link>
          <Link href={"/?cat=art"}>
            <h6 className="link">gaming</h6>
          </Link>
          <Link href={"/?cat=art"}>
            <h6 className="link">technology</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link href="/login">
              <div className="link">Login</div>
            </Link>
          )}
          <span className="write">
            <Link href={"/write"}>
              <a className="link">Write</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

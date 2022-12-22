import React from "react";
import Logo from "../public/img/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <Image objectFit="contain" alt="logo" height={50} width={80} src={Logo} />

      <span>
        Made with love and <b>NextJS</b>
      </span>
    </footer>
  );
};

export default Footer;

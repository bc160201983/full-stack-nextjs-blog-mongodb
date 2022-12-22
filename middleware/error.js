import React from "react";

const error = (handler) => {
  return (err, res, req) => {
    return res.status(500).json("hello error from handler");
  };
};

export default error;

import React from "react";
import Register from "../components/Register";

const register = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default register;

register.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

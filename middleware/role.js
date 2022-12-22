const role = (handler) => {
  return (req, res) => {
    console.log("middleware called");
    return handler(req, res);
  };
};

export default role;

import connectdb from "../../../database/connect";

const getPosts = async (req, res) => {
  await connectdb();
  return <div>getPosts</div>;
};

export default getPosts;

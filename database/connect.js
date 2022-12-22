import { connect } from "mongoose";

//mongodb+srv://<username>:<password>@cluster0.f08zt.mongodb.net/?retryWrites=true&w=majority

const connectdb = async () => {
  try {
    await connect(
      "mongodb+srv://admin:admin123@cluster0.xi028ei.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectdb;

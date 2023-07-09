import { connect } from "mongoose";

const connectDB = () => {
  return connect("mongodb://127.0.0.1:27017/Store");
};

export default connectDB;

import products from "./routes/product.js";
import connectDB from "./db/connect.js";
import users from "./routes/user.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import verifyToken from "./middlewares/verifyToken.js";
import authUser from "./middlewares/authUser.js";
import express from "express";
const app = express();
app.use(express.json());
app.use(users);
app.use("/products", products);
app.post(
  "/users/:userId/products/:productId",
  verifyToken,
  authUser,
  async (req, res) => {
    const { userId, productId } = req.params;
    const user = await User.findOne({ _id: userId });
    const product = await Product.findOne({ _id: productId });
    if (product) {
      user.products.push(productId);
      user.save();
      res
        .status(200)
        .json({ status: "sucess", message: "Purchased Successfully" });
    }
    res
      .status(404)
      .json({ status: "failed", message: "product doesn't Exist" });
  }
);
const port = 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

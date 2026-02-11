import express from "express";
import morgan from "morgan";
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";

const app = express();

// set middlewares
app.use(morgan("dev"));
app.use(express.json());

// set routers
app.use("/users", userRouter);
app.use("/products", productRouter);

// not found middleware
app.use("/", (req, res) => {
  return res.status(404).json({ message: "Endpoint not found" });
});

// error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  return res
    .status(error.status || 500)
    .json(error.message || "Internal Server error");
});

export default app;

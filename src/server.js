import express from "express";
import mongoose from "mongoose";
import { authController, homeController } from "./controllers";
import { checkSession } from "./middleware";

const app = express();
app.use(express.json());

try {
  mongoose.connect("mongodb://localhost/login-sys-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
} catch (error) {
  console.log(error);
}

app.post("/v1/auth/register", authController.register);
app.post("/v1/auth/login", authController.login);
app.delete("/v1/auth/logout", authController.logout);
app.get("/v1/home/user-details", checkSession, homeController.userDetails);

app.listen(3000);

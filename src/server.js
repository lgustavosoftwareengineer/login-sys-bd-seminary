import express from "express";
import mongoose from "mongoose";
import { authController, homeController } from "./controllers";
import { checkSession } from "./middleware";

const server = express();
server.use(express.json());

try {
  mongoose.connect("mongodb://localhost/login-sys-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
} catch (error) {
  console.log(error);
}

server.post("/v1/auth/register", authController.register);
server.post("/v1/auth/login", authController.login);
server.delete("/v1/auth/logout", authController.logout);
server.get("/v1/home/user-details", checkSession, homeController.userDetails);

server.listen(3000);

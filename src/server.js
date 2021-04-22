const express = require("express");
const { MD5 } = require("crypto-js");

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      message: "miss some default field, please try again",
    });

  const hashedPassword = MD5(password).toString();

  return res.status(201).json({
    email,
    password: hashedPassword,
  });
});

app.delete("/logout", (req, res) => {
  return res.json({
    message: "logout route",
  });
});

app.listen(3000);

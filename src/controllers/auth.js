import { MD5 } from "crypto-js";
import User from "../models/user";
import Session from "../models/session";

export default {
  register: async (req, res) => {
    const { name, email, cellphone, password, confirmPassword } = req.body;

    if (!name || !email || !cellphone || !password || !confirmPassword)
      return res.status(400).json({
        endpoint: req.originalUrl,
        msg: "miss some default field, please try again",
      });

    const registerAlreadyExist = await User.findOne({ email });

    if (password !== confirmPassword) {
      return res.status(400).json({
        endpoint: req.originalUrl,
        msg: "the passwords must be equal",
      });
    }
    if (registerAlreadyExist) {
      return res
        .status(400)
        .json({ endpoint: req.originalUrl, msg: "register already exist" });
    }

    const hashedPassword = MD5(password).toString();

    const savesRegister = new User({
      name,
      email,
      cellphone,
      password: hashedPassword,
    });

    await savesRegister.save();

    return res.status(201).json({ endpoint: req.originalUrl, savesRegister });
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        endpoint: req.originalUrl,
        msg: "miss some default field, please try again",
      });

    const findUser = await User.findOne({
      email,
      password: MD5(password).toString(),
    });

    if (!findUser) {
      return res.status(400).json({
        endpoint: req.originalUrl,
        msg: "check if your password or your email is correct, please",
      });
    }

    const newSession = new Session({
      userId: findUser._id,
    });

    await newSession.save();

    res.set("sessionId", [newSession._id]);

    return res.status(201).json({
      endpoint: req.originalUrl,
      msg: "logged",
      sessionId: newSession._id,
    });
  },
  logout: async (req, res) => {
    const sessionId = req.get("Authorization");

    const findingAOpenSession = await Session.findOne({ _id: sessionId });

    try {
      const findedAndDeletedSession = await Session.findOneAndDelete({
        _id: sessionId,
      });
      if (!findedAndDeletedSession) {
        return res.status(400).json({
          endpoint: req.originalUrl,
          msg: "error",
        });
      }
      return res.status(200).json({
        endpoint: req.originalUrl,
        msg: "logout done",
        closedSession: findingAOpenSession,
      });
    } catch (error) {
      return res.status(400).json({
        endpoint: req.originalUrl,
        msg: "error",
      });
    }
  },
};

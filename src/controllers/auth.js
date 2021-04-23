import { MD5 as hashingFunction } from "crypto-js";
import User from "../models/user";
import Session from "../models/session";
import { Request, Response } from "express";

export default {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  register: async (req, res) => {
    const { name, email, cellphone, password, confirmPassword } = req.body;
    const endpoint = req.originalUrl;

    if (!name || !email || !cellphone || !password || !confirmPassword)
      return res.status(400).json({
        endpoint,
        msg: "miss some default field, please try again",
      });

    const registerAlreadyExist = await User.findOne({ email });

    if (password !== confirmPassword)
      return res.status(400).json({
        endpoint,
        msg: "the passwords must be equal",
      });

    if (registerAlreadyExist)
      return res.status(400).json({ endpoint, msg: "register already exist" });

    const hashedPassword = hashingFunction(password).toString();

    const savesRegister = new User({
      name,
      email,
      cellphone,
      password: hashedPassword,
    });

    await savesRegister.save();

    return res.status(201).json({ endpoint, savesRegister });
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  login: async (req, res) => {
    const { email, password } = req.body;
    const endpoint = req.originalUrl;

    if (!email || !password)
      return res.status(400).json({
        endpoint,
        msg: "miss some default field, please try again",
      });

    const findUser = await User.findOne({
      email,
      password: hashingFunction(password).toString(),
    });

    if (!findUser)
      return res.status(400).json({
        endpoint,
        msg: "check if your password or your email is correct, please",
      });

    const newSession = new Session({
      userId: findUser._id,
    });

    await newSession.save();

    res.set("sessionId", [newSession._id]);

    return res.status(201).json({
      endpoint,
      msg: "logged",
      sessionId: newSession._id,
    });
  },
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  logout: async (req = request, res = response) => {
    const sessionId = req.get("Authorization");
    const endpoint = req.originalUrl;

    const findingAOpenSession = await Session.findOne({ _id: sessionId });

    try {
      const findedAndDeletedSession = await Session.findOneAndDelete({
        _id: sessionId,
      });
      if (!findedAndDeletedSession)
        return res.status(400).json({
          endpoint,
          msg: "error",
        });

      return res.status(200).json({
        endpoint,
        msg: "logout done",
        closedSession: findingAOpenSession,
      });
    } catch (error) {
      return res.status(400).json({
        endpoint,
        msg: "error",
      });
    }
  },
};

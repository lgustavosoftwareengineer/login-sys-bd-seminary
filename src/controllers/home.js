import { Session, User } from "../models";
import { Request, Response } from "express";

export default {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  userDetails: async (req, res) => {
    const sessionId = req.get("Authorization");
    try {
      const findSession = await Session.findById(sessionId);

      const findUser = await User.findById(findSession.userId);

      const { name, email, cellphone } = findUser;

      return res.status(201).json({
        endpoint: req.originalUrl,
        msg: "user details",
        userDetails: { name, email, cellphone },
      });
    } catch (error) {
      return res.status(400).json({
        endpoint: req.originalUrl,
        msg: "error",
      });
    }
  },
};

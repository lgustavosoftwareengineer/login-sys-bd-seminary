import { Session, User } from "../models";

export default {
  userDetails: async (req, res) => {
    const sessionId = req.get("Authorization");
    try {
      const findSession = await Session.findById(sessionId);

      const findUser = await User.findById(findSession.userId);

      const { name, email, cellphone } = findUser;

      return res.json({
        msg: "user details",
        userDetails: { name, email, cellphone },
      });
    } catch (error) {
      return res.status(400).json({
        msg: "error",
      });
    }
  },
};

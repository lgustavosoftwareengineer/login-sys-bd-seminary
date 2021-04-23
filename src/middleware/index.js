import { Request, Response, NextFunction } from "express";
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const checkSession = (req, res, next) => {
  const existSession = req.get("Authorization");
  const endpoint = req.originalUrl;

  if (existSession) return next();

  return res.status(400).json({
    endpoint,
    msg: "login necessary to see this page",
  });
};

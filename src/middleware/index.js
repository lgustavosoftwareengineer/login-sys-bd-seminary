export function checkSession(req, res, next) {
  const existSession = req.get("Authorization");

  if (existSession) {
    return next();
  }

  return res.status(400).json({
    msg: "login necessary to see this page",
  });
}

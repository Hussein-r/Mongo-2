const authUser = (req, res, next) => {
  if (!req.user) {
    return res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user.role === "admin") {
    next();
  } else {
    next();
  }
};
export default authUser;

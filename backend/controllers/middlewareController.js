const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("Token is not valid on md");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authencated on md");
    }
  },
  //verify Token of page it like brige conect to router and controller
  verifyTokenisAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You're not admin");
      }
    });
  },
};
module.exports = middlewareController;

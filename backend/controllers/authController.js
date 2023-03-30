const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokens = require("../models/refreshTokens");
// let refreshTokens = []

const authController = {
  registerUser: async (req, res) => {
    try {
      const sault = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, sault); //khuc nay giong nhu ma hoa md5 ben php
      //create new user
      const newUser = new User({
        username: req.body.username,
        password: hashed,
        email: req.body.email,
        avatar: 0,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // tao access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "100s" }
    );
  },
  //tao refresh token cho access token
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "100d" }
    );
  },
  saveRefreshToken: async (token) => {
    const newRefreshToken = new refreshTokens({
      token,
    });

    try {
      const savedToken = await newRefreshToken.save();
      return savedToken;
    } catch (err) {
      console.error(err);
      throw new Error("Could not save refresh token to database");
    }
  },
  findRefreshToken: async (token) => {
    try {
      const refreshToken = await refreshTokens.findOne({ token });
      return refreshToken;
    } catch (err) {
      console.error(err);
      throw new Error("Could not find refresh token in database");
    }
  },
  // Update refresh token in database
  updateRefreshToken: async (oldToken, newToken) => {
    try {
      const refreshToken = await refreshTokens.findOneAndUpdate(
        { token: oldToken },
        { token: newToken }
      );
      return refreshToken;
    } catch (err) {
      console.error(err);
      throw new Error("Could not update refresh token in database");
    }
  },
  // generateToken: async (refreshToken) => {
  //   try {
  //     const createRefreshTokens = new refreshTokens({
  //       token: refreshToken,
  //     });
  //     const token = await createRefreshTokens.save();
  //     return token;
  //   } catch (err) {
  //     return err;
  //   }
  // },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("Wrong username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password");
      }
      if (user && validPassword) {
        const accessToken = await authController.generateAccessToken(user);
        const refreshToken = await authController.generateRefreshToken(user);
        // const token = await authController.generateToken(refreshToken);
        // const createRefreshTokens = new refreshTokens({
        //   token: refreshToken,
        // });
        // const token = await createRefreshTokens.save();
        const savedToken = await authController.saveRefreshToken(refreshToken);
        if (savedToken) {
          const setDay = new Date();
          setDay.setTime(setDay.getTime() + 100 * 24 * 60 * 60 * 1000);
          // refreshTokens.push(refreshToken);
          const { password, ...others } = user._doc;
          res.header("Access-Control-Allow-Origin");
          res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
          res.header("Access-Control-Allow-Header");
          res.header("Content-Type", "application/json; charset=UTF-8");
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "Strict",
            expires: setDay,
          });
          return res.status(200).json({ ...others, accessToken, refreshToken }); // luu cookie o phia frontend
        } else {
          return res.status(500).json("Can't login please try later !");
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  logoutUser: async (req, res) => {
    try {
      res.clearCookie("refreshToken");
      const validToken = await refreshTokens.deleteOne({
        token: req.cookies.refreshToken,
      });
      return res.status(200).json("Logout successfully!");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    try {
      const refreshToken = req.cookies.refreshToken;
      //Send error if token is not valid
      if (!refreshToken)
        return res.status(401).json("You're not authenticated");
      // if (!refreshTokens.includes(refreshToken)) {
      //   return res.status(403).json("Refresh token is not valid");
      // }
      const validToken = await refreshTokens.findOne({ token: refreshToken });
      if (!validToken)
        return res.status(403).json("Refresh token is not valid");
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_KEY,
        async (err, user) => {
          if (err) {
            console.log(err);
          }
          //   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

          //create new access token, refresh token and send to user
          const newAccessToken = await authController.generateAccessToken(user);
          const newRefreshToken = await authController.generateRefreshToken(
            user
          );
          const updatedRefreshToken = await refreshTokens.findOneAndUpdate(
            { token: refreshToken },
            { token: newRefreshToken },
            { new: true }
          );
          if (!updatedRefreshToken) {
            return res.status(500).json("Failed to update refresh token");
          }
          // const newToken = await validToken.updateOne({
          //   token: newRefreshToken,
          // });
          if (updatedRefreshToken) {
            const setDay = new Date();
            setDay.setTime(setDay.getTime() + 100 * 24 * 60 * 60 * 1000);
            res.header("Access-Control-Allow-Origin");
            res.header(
              "Access-Control-Allow-Methods",
              "GET, POST, PUT, DELETE"
            );
            res.header("Access-Control-Allow-Header");
            res.header("Content-Type", "application/json; charset=UTF-8");
            res.cookie("refreshToken", newRefreshToken, {
              httpOnly: true,
              secure: true,
              path: "/",
              sameSite: "Strict",
              expires: setDay,
            });
            return res.status(200).json({ accessToken: newAccessToken });
          }
        }
      );
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // requestRefreshToken: async(req, res) => {
  //     const refreshToken = req.cookies.refreshToken
  //     if(!refreshToken) return res.status(401).json("You're not authencated")
  //     if(!refreshTokens.includes(refreshToken)) {
  //         return res.status(403).json("Refresh token isn't valid")
  //     }
  //     jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
  //         if(err) {
  //             console.log(err)
  //         }
  //         refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
  //         const newAccessToken = authController.generateAccessToken(user)
  //         const newRefreshToken = authController.generateRefreshToken(user)
  //         refreshTokens.push(newRefreshToken)
  //         res.cookie("refreshToken", newRefreshToken, {
  //             httpOnly: true,
  //             secure: false,
  //             path: "/",
  //             sameSite: "strict"
  //         })
  //         res.status(200).json({accessToken: newAccessToken})
  //     })
  // }
};
module.exports = authController;

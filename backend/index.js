const express = require("express");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const folderRoute = require("./router/folder");
const noteRoute = require("./router/note");
const memberRoute = require("./router/member");
dotenv.config();

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: ["http://localhost:8000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/v1/auth/", authRoute);
app.use("/v1/user/", userRoute);
app.use("/v1/folder/", folderRoute);
app.use("/v1/note/", noteRoute);
app.use("/v1/member/", memberRoute);
const port = process.env.PORT;
mongoose.connect(
  process.env.MONGOOSE_URL,
  () => {
    console.log("MongoDB is connected");
  },
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
app.listen(port, () => {
  console.log(`Server is runing ${port}`);
});

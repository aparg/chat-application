require("dotenv").config();
const fsPromises = require("fs").promises;
const express = require("express");
const { createServer } = require("http");
const app = express();
const register = require("./routes/register");
const auth = require("./routes/auth");
const refreshToken = require("./routes/refreshToken");
const logout = require("./routes/logout");
const message = require("./routes/message");
const conversation = require("./routes/conversation");
//for jwt verification
const { verifyToken } = require("./middlewares/jwtVerify");
const rolesVerify = require("./middlewares/rolesVerify");
const ROLES = require("./config/roles");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./config/dbconfig");
const corsOptions = require("./config/corsOptions");
const allowedOrigins = require("./config/allowedOrigins");
const PORT = process.env.PORT || 3500;
//for socket.io
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
  },
});

dbConfig();
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(cookieParser());

//cors
app.use(cors(corsOptions));

//welcome route
app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center; width:100%'>Welcome to register react authentication api!</h1>"
  );
});

//register route
app.use("/register", register);

//login route
app.use("/auth", auth);
app.use("/refresh", refreshToken);
app.use("/logout", logout);
app.use(verifyToken);
app.use("/message", message);
app.use("/conversation", conversation);
app.get("/protected", (req, res) => res.send("Secret"));
// app.use(rolesVerify(ROLES.Admin));
//all the protected routes should be placed here...

mongoose.connection.once("open", () => {
  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      console.log(msg);
    });
  });
  // app.listen(PORT, () => {});
  httpServer.listen(PORT);
});

require("dotenv").config();
const fsPromises = require("fs").promises;
const express = require("express");
const { createServer } = require("http");
const app = express();
//routes
const register = require("./routes/register");
const auth = require("./routes/auth");
const refreshToken = require("./routes/refreshToken");
const logout = require("./routes/logout");
const message = require("./routes/message");
const conversation = require("./routes/conversation");
const friends = require("./routes/friends");
const addFriends = require("./routes/addFriends");
const showFriendReq = require("./routes/showFriendReq");
const manageFriendReq = require("./routes/manageFriendRequest");
const editProfile = require("./routes/editProfile");
const groups = require("./routes/group");
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
const sendMessageSocket = require("./socket/sendMessageSocket");
const getMessageSocket = require("./socket/getMessageSocket");
const getSpamMessageSocket = require("./socket/getSpamMessageSocket");
const Users = require("./models/Users");
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
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

//cors
app.use(cors(corsOptions));
app.set("io", io); //to provide io object to  all the routes
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
app.use("/conversation", conversation);
app.use("/message", message);

// app.use("/allusers", allUsers);
app.use("/editProfile", editProfile);
app.use("/friends", friends);
app.use("/addfriends", addFriends);
app.use("/showFriendRequests", showFriendReq);
app.use("/manageFriendRequest", manageFriendReq);
app.use("/groups", groups);
// app.use("/message", message);
// app.use(rolesVerify(ROLES.Admin));
//all the protected routes should be placed here...

mongoose.connection.once("open", () => {
  io.on("connection", async (socket) => {
    socket.on("username", async ({ username }) => {
      console.log("joined");
      const user = await Users.findOne({ username }).exec();
      const userId = user._id;
      socket.join(`user${userId}`);
    });
    socket.on("join room", ({ conversationId }) => {
      socket.rooms.forEach((value) => {
        //leave other rooms except for the room for conversation currently opened
        if (!value?.includes("user") && value !== socket.id) {
          socket.leave(value);
        }
      });
      socket.join(conversationId);
    });
    getMessageSocket(socket, io);
    sendMessageSocket(socket, io);
    getSpamMessageSocket(socket, io);
  });

  // app.listen(PORT, () =>  {});
  httpServer.listen(PORT);
});

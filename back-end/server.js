const fsPromises = require("fs").promises;
const express = require("express");
const app = express();
const register = require("./routes/register");
const auth = require("./routes/auth");
const refreshToken = require("./routes/refreshToken");
const logout = require("./routes/logout");
//for jwt verification
const { verifyToken } = require("./middlewares/jwtVerify");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT | 3500;

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(cookieParser());
//register route
app.use("/register", register);

//login route
app.use("/auth", auth);
app.use("/refresh", refreshToken);
app.use("/logout", logout);
app.use(verifyToken);
//all the protected routes should be placed here...
app.get("/protected", (req, res) => res.send("Secret"));

//welcome route
app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center; width:100%'>Welcome to register react authentication api!</h1>"
  );
});

app.listen(PORT, () => {});

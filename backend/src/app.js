const path = require("path");
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const User = require("./models/user.mongo");
const cors = require("cors");

require("dotenv").config();

const api = require("./routes/api");
const passportRouter = require("./routes/passport");

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  const userExist = await User.findOne({ googleId: profile.id });

  if (!userExist) {
    const { sub, name, email } = profile._json;

    const createdUser = await User.create({
      googleId: sub,
      name,
      email,
      isAdmin: true,
    });
    done(null, {
      ...profile,
      _id: createdUser._id,
      isAdmin: createdUser.isAdmin,
    });
  }

  done(null, { ...profile, _id: userExist._id, isAdmin: userExist.isAdmin });
}

passport.use(
  new Strategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
    },
    verifyCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "/uploads")));

app.use("/api", api);
app.use("/auth", passportRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

module.exports = app;

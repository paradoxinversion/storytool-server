const express = require("express");
const userRoutes = require("./routes/users");
const auth = require("./routes/auth");
const setupdb = require("./mongo/setupdb");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./mongo/models/User");
const app = express();
const port = 3001;
const database = setupdb(false);
passport.use(
  new LocalStrategy(async function(username, password, done) {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (!user.checkPassword(password)) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const user = User.findById(id);
  done(null, user);
});

app.use(passport.initialize());

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/users", userRoutes);

app.get("/testUser", (req, res) =>
  res.json({
    id: "ba",
    stories: ["aa", "ab"],
    characters: ["da", "db", "dc"],
    username: "Testy McTest"
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const setupdb = require("./mongo/setupdb");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const graphqlHTTP = require("express-graphql");
const graphql = require("graphql");
const { schema, root } = require("../gql/schema");
const User = require("./mongo/models/User");
const morgan = require("morgan");
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
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, append,delete,entries,foreach,get,has,keys,set,values,Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });
app.use(morgan("dev"));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/login", authRoutes);
app.get("/testUser", (req, res) =>
  res.json({
    id: "ba",
    stories: ["aa", "ab"],
    characters: ["da", "db", "dc"],
    username: "Testy McTest"
  })
);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

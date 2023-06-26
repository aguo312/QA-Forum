const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const User = require("./models/users");
// const Answer = require("./models/answers");
// const Question = require("./models/questions");
// const Comment = require("./models/comments");
// const Tag = require("./models/tags");

let mongoose = require("mongoose");
let mongoDB = "mongodb://127.0.0.1:27017/qa_forum";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once("open", () => {
  console.log("Database connected: " + mongoDB);
});
db.on("error", (err) => {
  console.error("Connection error: ", err);
});
process.on("SIGINT", () => {
  if (db) {
    db.close()
      .then((result) =>
        console.log("Server closed. Database instance disconnected")
      )
      .catch((err) => console.log(err));
  }
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoDB }),
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  let existingUser = await User.findOne({ email });
  res.send(existingUser);
});

app.post("/register", async (req, res) => {
  const username = req.body[0];
  const email = req.body[1];
  const password = req.body[2];
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashPass,
  });
  newUser.save();
  res.send(newUser);
});

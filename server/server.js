const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const User = require("./models/users");
const Question = require("./models/questions");
// const Answer = require("./models/answers");
const Tag = require("./models/tags");
// const Comment = require("./models/comments");

let mongoose = require("mongoose");
const e = require("express");
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
      expires: 1000 * 60 * 15,
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

app.post("/login", async (req, res) => {
  const userData = req.body[0];
  const password = req.body[1];
  const passwordCheck = await bcrypt.compare(password, userData.data.password);
  if (!passwordCheck) {
    res.send();
  } else {
    req.session.loggedUser = userData.data;
    req.session.guest = false;
    res.send(userData.data);
  }
});

app.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send();
  });
});

app.get("/userdata", async (req, res) => {
  res.send(req.session);
});

app.get("/userandtagsname", async (req, res) => {
  const tagData = await Tag.find({});
  const existingTags = tagData.map((tagObj) => {
    return tagObj.name;
  });
  res.send([req.session, existingTags]);
});

app.post("/addtags", async (req, res) => {
  req.body.forEach((e) => {
    const tagObj = new Tag(e);
    tagObj.save();
  });
  res.send(req.body);
});

app.get("/tags", async (req, res) => {
  const tagData = await Tag.find({});
  res.send(tagData);
});

app.post("/addquestion", async (req, res) => {
  let qstnObj = new Question(req.body);
  qstnObj.save();
  res.send(qstnObj);
});

app.get("/userandquestions", async (req, res) => {
  const questionData = await Question.find({}).populate("tags");
  res.send([req.session, questionData]);
});

app.put("/questionclick/:qid", async (req, res) => {
  await Question.findByIdAndUpdate(
    { _id: req.params.qid },
    { $inc: { views: 1 } }
  );
  res.send();
});

app.get("/questions/:qid", async (req, res) => {
  const question = await Question.findOne({ _id: req.params.qid }).populate(
    "tags"
  );
  res.send(question);
});

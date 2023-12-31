const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const User = require("./models/users");
const Question = require("./models/questions");
const Answer = require("./models/answers");
const Tag = require("./models/tags");
const Comment = require("./models/comments");

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
  const qstnObj = new Question(req.body);
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
  const question = await Question.findOne({ _id: req.params.qid })
    .populate("tags")
    .populate("comments");
  res.send([req.session, question]);
});

app.get("/questions", async (req, res) => {
  const questionData = await Question.find({});
  res.send(questionData);
});

app.post("/addanswer", async (req, res) => {
  const ansObj = new Answer(req.body[0]);
  ansObj.save();
  await Question.findByIdAndUpdate(
    { _id: req.body[1] },
    { $addToSet: { answers: ansObj._id } }
  );
  res.send();
});

app.get("/answers/:aid", async (req, res) => {
  const answer = await Answer.findOne({ _id: req.params.aid }).populate(
    "comments"
  );
  res.send([req.session, answer]);
});

app.get("/comments/:cid", async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.cid });
  res.send(comment);
});

app.get("/comments", async (req, res) => {
  const commentData = await Comment.find({});
  res.send([req.session, commentData]);
});

app.post("/addcomment", async (req, res) => {
  const comObj = new Comment(req.body[0]);
  comObj.save();
  if (req.body[1] == "question") {
    await Question.findByIdAndUpdate(
      { _id: req.body[2] },
      { $addToSet: { comments: comObj._id } }
    );
  } else if (req.body[1] == "answer") {
    await Answer.findByIdAndUpdate(
      { _id: req.body[2] },
      { $addToSet: { comments: comObj._id } }
    );
  }
  res.send();
});

app.get("/alldata/:uid", async (req, res) => {
  const questions = await Question.find({ owner: req.params.uid });
  const answers = await Answer.find({ owner: req.params.uid });
  const tags = await Tag.find({ owner: req.params.uid });
  const comments = await Comment.find({ owner: req.params.uid });
  res.send([req.session, questions, answers, tags, comments]);
});

app.delete("/deletequestion/:qid", async (req, res) => {
  await Question.deleteOne({ _id: req.params.qid });
  res.send();
});

app.delete("/deleteanswer/:aid", async (req, res) => {
  await Answer.deleteOne({ _id: req.params.aid });
  await Question.updateMany(
    { answers: { $in: req.params.aid } },
    { $pull: { answers: { $in: req.params.aid } } }
  );
  res.send();
});

app.delete("/deletetag/:tid", async (req, res) => {
  await Tag.deleteOne({ _id: req.params.tid });
  await Question.updateMany(
    { tags: { $in: req.params.tid } },
    { $pull: { tags: { $in: req.params.tid } } }
  );
  res.send();
});

app.delete("/deletecomment/:cid", async (req, res) => {
  await Comment.deleteOne({ _id: req.params.cid });
  await Question.updateMany(
    { comments: { $in: req.params.cid } },
    { $pull: { comments: { $in: req.params.cid } } }
  );
  await Answer.updateMany(
    { comments: { $in: req.params.cid } },
    { $pull: { comments: { $in: req.params.cid } } }
  );
  res.send();
});

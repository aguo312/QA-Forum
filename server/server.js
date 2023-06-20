const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

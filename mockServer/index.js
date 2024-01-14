const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const data = require("./data/user.json");
const books = require("./data/books.json");
const cors = require("cors");

const app = express();

const PORT = "3030";

const upload = require("./upload");
const tokenFun = require("./generateToken");
const { response } = require("express");

// Serve static files from the `Static Files` directory.
app.use("/static", express.static(path.join(__dirname, "Static Files")));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "sonu.png"));
});
app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to node js");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const isValid = isValidUser(username, password);
  let token;
  if (isValid) {
    token = tokenFun.getToken();
  }
  res.status(isValid ? 200 : 401).send({ token: token, user: isValid });
});

app.get("/books", (req, res) => {
  const token = req.headers.authorization;
  if (tokenFun.verifyToken(token)) {
    const bookList = books.books;
    res.status(200).send({ booklist: bookList });
  } else {
    res.status(500).send({ error: "Invalid Token" });
  }
});

// Set up a route for file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  // Handle the uploaded file
  res.json({ message: "File uploaded successfully!" });
});

app.get("/verifyToken", (req, res) => {
  const token = req.headers.authorization;
  tokenFun.verifyToken(token)
    ? res.status(200).send({ success: token })
    : res.status(500).send({ error: "invalid token" });
});

app.get("/users", (req, res) => {
  res.status(200).send({ data: data.users });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is listening on port " + PORT);
  } else {
    console.log("Error while starting the server: ", error);
  }
});

// server side event implementation

app.get("/events", (request, response) => {
  console.log("Client Connected");
  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Access-Control-Allow-Origin", "*");
  const time = new Date();
  const intervalId = setInterval(() => {
    const result = new Date() - time;
    const date = {
      date: result.toString()[0],
      sender: "Sonu Kumar",
      email: "enggsonukomar@gmail.com",
      subject: "Payment Accepted",
    };
    const data = JSON.stringify(date);
    response.write(`data: ${data}\n\n`);
  }, 10000);

  response.on("close", () => {
    console.log("Connection Closed");
    clearInterval(intervalId);
    response.end();
  });
});

const isValidUser = (name, password) => {
  for (let user of data.users) {
    if (user.firstName === name && user.password === password) {
      return user;
    }
  }
  return false;
};

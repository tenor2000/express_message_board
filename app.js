const express = require("express");
const app = express();
const path = require("node:path");

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
  

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// middleware to parse form data into req.body
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express Messageboard app - listening on port ${PORT}!`);
});

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
    res.render("form", { title: "New Message" });
});

app.post("/new", (req, res) => {
    messages.push({ text: req.body.text, user: req.body.user, added: new Date() });
    res.redirect("/");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err)
    // res.status(500).send(err)
    res.status(err.statusCode || 500).send(err.message);
});
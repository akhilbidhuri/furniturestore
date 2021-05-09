
const express = require("express");
const path = require("path");
const data = require("./data");
var cors = require('cors');
var winston = require('winston'),
    expressWinston = require('express-winston');

const app = express();

app.use(cors())
app.use(express.static(path.join(__dirname, ".", "build")));

app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )}
));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, ".", "build", "index.html"));
  });

app.get("/catalog", (req, res) => {
    res.send(data[req.query.category])
})

app.get("/category", (req, res)=> {
    res.send(Object.keys(data))
})

app.listen(process.env.PORT || 5000, () => {
    console.log("server started on port "+(process.env.PORT||5000));
  });
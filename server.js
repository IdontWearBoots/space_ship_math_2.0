const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.static("frontend"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, function (req, res) {
    console.log(`Listening on port ${port}`);
});
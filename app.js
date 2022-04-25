const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function (_, res) {
    res.render("index", {
        "page": "HOME"
    });
});

app.get("/:dir/:file", (req, res) => {
    const [dir, file] = Object.values(req.params);

    if(dir === "levels" && file !== "level_home"){
        let levelN = file[file.length - 1];
        const levelTimes = {
            1: 10000,
            2: 8000,
            3: 6000,
            4: 4000,
            5: 2000
        }


        res.render("levels/level", {
            "level_n": levelN,
            "level_time": (levelTimes[levelN])
        });

        return;
    }

    res.render(`${dir}/${file}`, {
        "page": dir.toUpperCase()
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
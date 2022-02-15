const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.get("/", (req, res) => {
    res.send("ok");
});

app.post('/upload', function (req, res) {
    if (req.files) {
        const file = req.files.file;
        const fileName = file.name;
        file.mv("./uploads/" + fileName, function (error) {

            if (error) {
                res.send(error);
            }
            else {
                res.json({ msg: "file uploaded!" });
            }
        })
    }
});

// download file 

app.get("/file/:name", (req, res) => {
    const fileName = req.params.name;
    if (fileName) {
        res.download("./uploads/" + fileName, fileName, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not download the file",
                });
            };
        });
    };
})

app.listen(5000);
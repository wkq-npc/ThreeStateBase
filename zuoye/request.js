const express = require('express');
const app = express();

const csBodyParse = require("./middlewares/csBodyParse");

app.use(csBodyParse);

app.get("/qiaomin", (req, res) => {
    // console.log(req);
});
app.listen(8080, () => {
    console.log("server is running at http://127.0.0.1:8080");
});
const express = require("express");
const jsonserver = require("json-server");

const app = express();

app.use("/", express.static("dist"));
app.use("/", express.static("assets"));

const router = jsonserver.router("data.json");
app.use(jsonserver.bodyParser);
app.use("/api", (req, res, next) => router(req, res, next));

const port = process.argv[3] || 4000;
app.listen(port, () => console.log(`Running on port ${port}`));

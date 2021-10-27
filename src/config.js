const fse = require("fs-extra");
const path = require("path");

let data = fse.readFileSync(path.join(__dirname, "../config.json"), "utf-8");
let config = JSON.parse(data);

module.exports = config;

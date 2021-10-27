const express = require("express");
const path = require("path");
const ScaleService = require("./services/scaleService");
const SliceService = require("./services/sliceService");
const DistributionService = require("./services/distributionService");
const { upload } = require("./middleware/multer");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.post("/", upload.single("model"), async (req, res) => {
	try {
		let currentFileName = req.file.filename;
		currentFileName = await ScaleService.scale(
			req.file.projectId,
			currentFileName
		);
		currentFileName = await SliceService.slice(
			req.file.projectId,
			currentFileName
		);
		await DistributionService.print(req.file.projectId, currentFileName);
		res.sendFile(__dirname + "/views/success.html");
	} catch (err) {
		console.log(err);
		res.sendFile(__dirname + "/views/failure.html");
	}
});

module.exports = app;

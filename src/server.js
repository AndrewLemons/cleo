const express = require("express");
const path = require("path");
const ScaleService = require("./services/scaleService");
const SliceService = require("./services/sliceService");
const DistributionService = require("./services/distributionService");
const { upload } = require("./middleware/multer");

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.static(path.resolve(__dirname, "../app/dist")));

app.post("/api/upload", upload.single("model"), async (req, res) => {
	let currentFileName = req.file.filename;

	try {
		currentFileName = await ScaleService.scale(
			req.file.projectId,
			currentFileName
		);
	} catch {
		return res.status(400).json({
			error: {
				title: "Invalid Model",
				message: "The model you provided is not in the correct format."
			},
		});
	}

	try {
		currentFileName = await SliceService.slice(
			req.file.projectId,
			currentFileName
		);
	} catch {
		return res.status(400).json({
			error: {
				title: "Slice Error",
				message: "The model you provided could not be sliced."
			},
		});
	}

	try {
		await DistributionService.print(req.file.projectId, currentFileName);
	} catch {
		return res.status(400).json({
			error: {
				title: "Distribution Error",
				message: "Your model could not be given to a printer. Are they all busy?"
			},
		});
	}

	res.json({
		success: true,
	});
});

module.exports = app;

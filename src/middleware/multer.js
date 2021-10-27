const multer = require("multer");
const ProjectService = require("../services/projectService");

const storage = multer.diskStorage({
	async destination(req, file, cb) {
		let { id, path } = await ProjectService.createProject();
		console.log(`[${id}]`, req.ip);
		file.projectId = id;
		cb(null, path);
	},
	async filename(req, file, cb) {
		cb(null, "upload.stl");
	},
});

const upload = multer({ storage });

module.exports = {
	storage,
	upload,
};

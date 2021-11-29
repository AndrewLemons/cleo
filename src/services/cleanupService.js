const ProjectService = require("./projectService");
const path = require("path");
const fse = require("fs-extra");
const config = require("../config");

async function cleanup() {
	console.log("[server] cleaning up");
	let projects = await fse.readdir(ProjectService.TMP_DIR);
	projects.forEach(async (project) => {
		let dirPath = path.join(ProjectService.TMP_DIR, project);
		let stats = await fse.stat(dirPath);
		let age = Date.now() - stats.birthtimeMs;
		if (age > config.maxProjectAge ?? 86400000) {
			console.log("[server] removed", project)
			await fse.rm(dirPath, { recursive: true })
		}
	});
}

module.exports = {
	cleanup,
};

const os = require("os");
const path = require("path");
const fse = require("fs-extra");
const { customAlphabet } = require("nanoid");

const TMP_DIR = path.join(os.tmpdir(), "/com.aglemons.auto-slicer");
const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 8);

function getProjectPath(id) {
	return path.join(TMP_DIR, id);
}

async function createProject() {
	let id = nanoid();
	let projectDir = getProjectPath(id);
	await fse.ensureDir(projectDir);
	console.log(`[${id}]`, "Created");
	return {
		id,
		path: projectDir,
	};
}

async function deleteProject(id) {
	let projectDir = getProjectPath(id);
	await fse.remove(projectDir);
}

module.exports = {
	getProjectPath,
	createProject,
	deleteProject,
	TMP_DIR,
};

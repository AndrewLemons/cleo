const path = require("path");
const cp = require("child_process");
const { applications } = require("../config");

const CURA_PATH = path.join(
	applications["Ultimaker Cura"],
	"/Contents/MacOS/CuraEngine"
);

function run(params, cwd) {
	return new Promise((resolve, reject) => {
		let process = cp.spawn(CURA_PATH, params, {
			cwd,
		});
		process.on("exit", (code) => {
			if (code !== 0) reject();
			resolve();
		});
	});
}
module.exports = {
	run,
};

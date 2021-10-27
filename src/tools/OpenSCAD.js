const path = require("path");
const cp = require("child_process");
const { applications } = require("../config");

const SCAD_PATH = path.join(
	applications["OpenSCAD"],
	"/Contents/MacOS/OpenSCAD"
);

function run(params, cwd) {
	return new Promise((resolve, reject) => {
		let process = cp.spawn(SCAD_PATH, params, {
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

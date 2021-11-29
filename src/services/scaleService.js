const OpenSCAD = require("../tools/OpenSCAD");
const ProjectService = require("./projectService");
const path = require("path");
const fse = require("fs-extra");
const STL = require("node-stl");
const { maxCubicSize } = require("../config");

async function scale(project, inputFile) {
	console.log(`[${project}]`, "Scaling");

	let projectPath = await ProjectService.getProjectPath(project);
	let inputFilePath = path.join(projectPath, inputFile);

	let inputStl = new STL(inputFilePath);
	let box = inputStl.boundingBox;
	let scale = 1;
	let largestDim = Math.max(...box);
	if (largestDim > 200) {
		scale = maxCubicSize / largestDim;
	}
	console.log(largestDim)
	console.log(scale)

	fse.writeFile(
		path.join(projectPath, "scale.scad"),
		`scale([${scale}, ${scale}, ${scale}]) import("${inputFilePath}");`
	);

	await OpenSCAD.run(["-o", "scaled.stl", "scale.scad"], projectPath);

	return "scaled.stl";
}

module.exports = {
	scale,
};

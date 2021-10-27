const CuraEngine = require("../tools/CuraEngine");
const ProjectService = require("./projectService");
const path = require("path");

async function slice(project, inputFile) {
	console.log(`[${project}]`, "Slicing");

	let projectPath = await ProjectService.getProjectPath(project);
	let inputFilePath = path.join(projectPath, inputFile);

	await CuraEngine.run(
		[
			"slice",
			"-j",
			path.join(
				__dirname,
				"../../resources/cura/definitions/creality_ender3.def.json"
			),
			"-s",
			"layer_height=0.3",
			"-s",
			"support_enable=true",
			"-s",
			"adhesion_type=skirt",
			"-o",
			path.join(projectPath, "output.gcode"),
			"-l",
			inputFilePath,
		],
		projectPath
	);

	return "output.gcode";
}

module.exports = {
	slice,
};

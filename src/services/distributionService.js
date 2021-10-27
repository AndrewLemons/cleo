const OctoPrint = require("../tools/OctoPrint");
const ProjectService = require("./projectService");
const path = require("path");
const { printers } = require("../config");

async function print(projectId, fileName) {
	let selectedPrinter = null;

	for (let printer of printers) {
		let { state } = await OctoPrint.getPrinterState(printer);
		if (state.flags.ready && state.flags.operational) {
			selectedPrinter = printer;
			break;
		}
	}

	if (selectedPrinter == null) throw new Error("No printer available");

	await OctoPrint.uploadFile(
		{
			sourceFile: path.join(ProjectService.getProjectPath(projectId), fileName),
			fileName: `${projectId}.gcode`,
		},
		selectedPrinter
	);

	await OctoPrint.printFile(
		{
			location: "local",
			file: `${projectId}.gcode`,
		},
		selectedPrinter
	);
}

module.exports = {
	print,
};

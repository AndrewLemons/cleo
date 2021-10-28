const fse = require("fs-extra");
const FormData = require("form-data");
const { default: axios } = require("axios");

async function getPrinterState({ host, apiKey }) {
	return (
		await axios.get(`http://${host}/api/printer`, {
			headers: {
				"X-Api-Key": apiKey,
			},
		})
	).data;
}

async function uploadFile({ sourceFile, fileName }, { host, apiKey }) {
	const form = new FormData();
	const file = await fse.readFile(sourceFile);
	form.append("file", file, fileName);

	let response = await axios.post(`http://${host}/api/files/local`, form, {
		headers: {
			...form.getHeaders(),
			"Content-Length": form.getLengthSync(),
			"X-Api-Key": apiKey,
		},
		maxContentLength: Infinity,
		maxBodyLength: Infinity,
	});
}

async function printFile({ location, file }, { host, apiKey }) {
	let response = await axios.post(
		`http://${host}/api/files/${location}/${file}`,
		{
			command: "select",
			print: true,
		},
		{
			headers: {
				"X-Api-Key": apiKey,
			},
		}
	);
}

module.exports = {
	getPrinterState,
	printFile,
	uploadFile,
};

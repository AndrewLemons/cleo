const config = require("./config");
const server = require("./server");

server.listen(config.port, () => {
	console.log(`Server listening at http://localhost:${config.port}/`);
});

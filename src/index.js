const config = require("./config");
const server = require("./server");
const CleanupService = require("./services/cleanupService");

CleanupService.cleanup();
setInterval(CleanupService.cleanup, 1000 * 60 * 60);

server.listen(config.port, () => {
	console.log("[server] started at", `http://localhost:${config.port}/`);
});

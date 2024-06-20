const path = require('path');
const fs = require('fs');

function serveStaticFiles(router, staticPath, filePaths) {
	filePaths.forEach((filePath) => {
		router.get(`/public/${filePath}`, (req, res) => {
			const fullPath = path.join(staticPath, filePath);

			res.sendFile(fullPath, (err) => {
				if (err) {
					console.error(err);
					// Handle errors more informatively (e.g., specific error codes)
					res.status(err.code || 500).send('Error serving static file'); // Generic error with code if available
				} else {
					console.log(`Successfully served static file: ${fullPath}`); // Optional logging for successful requests
				}
			});
		});
	});
}

function readUsersEmail(filePath) {
	const data = fs.readFileSync(filePath);
	return JSON.parse(data);
}

function writeUsersEmail(filePath, data) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
	readUsersEmail,
	serveStaticFiles,
	writeUsersEmail
};
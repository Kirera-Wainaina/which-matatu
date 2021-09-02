const http2 = require("http2");
const fs = require("fs");

const port = 443;
const options = {
    key: fs.readFileSync("localhost-privkey.pem"),
    cert: fs.readFileSync("localhost-cert.pem")
};

const server = http2.createSecureServer(options);

server.on("request", (request, response) => {
    console.log("Request received");
    response.writeHead(200, { "content-type": "text/plain" })
	.end("Hello word")
})

server.listen(port, () => console.log(`Listening on port ${port}`))

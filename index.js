const http2 = require("http2");
const fs = require("fs");
const url = require("url");
const path = require("path");

const port = 443;
const options = {
    key: fs.readFileSync("localhost-privkey.pem"),
    cert: fs.readFileSync("localhost-cert.pem")
};

const server = http2.createSecureServer(options);

server.on("request", (request, response) => {
    const url = new URL(request.headers[":path"], "https://whichmatatu.com")
    console.log(`${new Date()}, ${url.pathname}`)
    if (url.pathname == "/") {
	response.writeHead(200, {"content-type": "text/html" })
	fs.createReadStream(path.join(__dirname, "/frontend/html/home.html"))
	    .pipe(response)
    }
})

server.listen(port, () => console.log(`Listening on port ${port}`))

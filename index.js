const http2 = require("http2");
const fs = require("fs");
const url = require("url");
const path = require("path");

const mimes = require("./utils/MIMETypes.js");

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
	handleFile(response, "/frontend/html/home.html")
    } else {
	handleFile(response, url.pathname);
    }
})

server.listen(port, () => console.log(`Listening on port ${port}`));

function handleFile(response, webRoute) {
    let route, mimeType;
    if (path.extname(webRoute)) {
    	route = path.join(__dirname, webRoute);
	    mimeType = mimes.findMIMETypeFromExtension(path.extname(route));
    } else {
	    // browser routes
	    mimeType = mimes.findMIMETypeFromExtension(".html");
	    route = path.join(__dirname, "frontend", "html",  webRoute + ".html");
    }
    response.writeHead(200, { "content-type": mimeType });
    fs.createReadStream(route)
	.pipe(response)
}

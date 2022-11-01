const http = require('http')
const fs = require('fs')

const serveFile = (fileName, res) => {
    fs.readFile(__dirname + "/" + fileName +".html", function(err, buffer) {
        if (err) {
            statusCode = 404;
            fileBuffer = "File not found";
        } else {
            statusCode = 200;
            fileBuffer = buffer;
        }
        res.writeHead(statusCode); 
        res.end(fileBuffer);
    });
}

const serveRequest = (req, res) => {
    // console.log(req);
    if (req.method == 'POST') {
        res.setHeader("Content-Type", "application/json"); 
        res.writeHead(200);
        res.end("{'message' : 'Hello World!'}");
    } else { // GET
        if (req.url === "/")
            serveFile("index", res);
        else 
            serveFile(req.url, res);
    }

}

const server = http.createServer(serveRequest)
server.listen(3434, "localhost", function() {
    console.log("Server is running on http://localhost:3434");
})
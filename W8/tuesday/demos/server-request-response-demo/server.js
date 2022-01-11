const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.method === "GET" && req.url === "/") {
        const resBody = fs.readFileSync("index.html");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(resBody);
    }

    if (req.method === "GET" && req.url === "/static/main.css") {
        const resBody = fs.readFileSync(`.${req.url}`);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/css");
        return res.end(resBody);
    }

    let reqBody = "";
    req.on("data", (data) => {
        reqBody += data;
    });

    req.on("end", () => {
        if (reqBody) {
            // tasks=Read&time=12%3A50
            req.body = reqBody
                .split("&") // ['tasks=Read', 'time=12%3A50']
                .map((keyValuePair) => keyValuePair.split("=")) // [['tasks', 'Read'], ['time', '12%3A50']]
                .map(([key, value]) => [key, value.replace("+", " ")])
                .map(([key, value]) => [key, decodeURIComponent(value)]) // [['tasks', 'Read'], ['time', '12:50']]
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});

            // app.use(express.urlencoded);
            // app.use(express.json);
        }

        if (req.method === "POST" && req.url === "/tasks") {
            console.log(req.body);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        }

        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Page not found</h1>");
    });

  

    

});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));

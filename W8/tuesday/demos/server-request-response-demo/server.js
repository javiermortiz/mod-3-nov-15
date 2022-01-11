const http = require('http');
const fs = require("fs");

let database = [];

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.method === "GET" && req.url === "/") {
        const htmlPage = fs.readFileSync("index.html", "utf-8");
        const tasksList = database.map(task => {
            return `<li>${task["tasks"]} - ${task["time"]}</li>`;
        });

        // [`<li>Read - 13:00`, `<li>Read - 14:00</li>`]
        const resBody = htmlPage.replace(/#{tasks}/g, tasksList.join(""));
        // `<li>Read - 13:00</li><li>Read - 14:00</li>`
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
            database.push(req.body);
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

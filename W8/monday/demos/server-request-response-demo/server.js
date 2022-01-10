const http = require('http');
const fs = require("fs");

let database = [];
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
        
    if (req.method === "GET" && req.url === "/") {
        const htmlPage = fs.readFileSync("index.html", "utf-8");
        const tasksList = database.map(task => {
            return `<li>${task["tasks"]} - ${task["time"]}</li>`
        });
        const resBody = htmlPage
            .replace("${tasks}", tasksList.join(""));
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(resBody);
    }

    if (req.method === "GET" && req.url === "/posts") {
        const htmlPage = fs.readFileSync("posts.html", "utf-8");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(htmlPage);
    }

    if (req.method === "GET" && req.url === "/main.css") {
        const resBody = fs.readFileSync("main.css");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/css");
        return res.end(resBody);
    }

    let reqBody = "";
    req.on("data", (data) => {
        reqBody += data;
    });

    req.on("end", () => {
        // Parsing the body of the request
        if (reqBody && req.headers["content-type"] === "application/x-www-form-urlencoded" ) {
            req.body = reqBody
                .split("&")
                .map((keyValuePair) => keyValuePair.split("="))
                .map(([key, value]) => [key, value.replace(/\+/g, " ")])
                .map(([key, value]) => [key, decodeURIComponent(value)])
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
            console.log(req.body);
        }
        if (req.method === "POST" && req.url === "/tasks") {
            // Create a task
            // console.log(req.body);
            // database.push(req.body);
            // res.statusCode = 302;
            // res.setHeader("Location", "/");
            // return res.end();
            res.statusCode = 201;
            res.setHeader("Content-Type", "text/html");
            res.end(`<h1>This is your new task ${req.body.tasks}</h1>`)
        }  

        if (req.method === "GET" && req.url === "/tasks") {
            // Read all of the tasks
        }

        if (req.method === "PATCH" && req.url === "/tasks") {
            // update a task
            // {id: 1, task: "read", time: "11:30"};
            if (req.body.userId !== req.body.taskId.userId) {
                res.statusCode = 400;
            } else {
                res.statusCode = 200;
            }
        }  

        if (req.method === "DELETE" && req.url === "/tasks") {
            // delete a task
        }  

        if (req.method === "Post" && req.url === "posts/5/comments") {

        }
        
        else {
            res.statusCode = 800;
            res.end('Not a valid url');
        }
    });
    
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
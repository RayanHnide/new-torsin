// try {
//     const express = require("express");
//     const next = require("next");
//     require("dotenv").config({ path: "./env" });
//     const dev = process.env.NODE_ENV !== "production";
//     const app = next({ dev });
//     const routes = require("./routes");
//     const bodyParser = require("body-parser");
//     const handle = routes.getRequestHandler(app);

//     app.prepare()

//         .then(() => {
//             const server = express();
//             server.use(bodyParser.json({ limit: "50mb" }));
//             server.use(function (req, res, next) {
//                 res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//                 res.header("Access-Control-Allow-Origin", "*");
//                 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//                 res.header("Access-Control-Allow-Credentials", true);
//                 next();
//             });
//             server.use("./server/health", (req, res, next) => {
//                 res.send({ success: true, message: "Server is running.." })
//             });
//             server.get("*", (req, res) => {
//                 return handle(req, res)
//             })
//             server.listen(8081, (err) => {
//                 if (err) throw err
//                 console.log(`> Ready on http://localhost:${process.env.PORT}`)
//             })
//         })
//         .catch((ex) => {
//             console.log(ex.message)
//             process.exit(1)
//         })
// }

// catch (err) {
//     console.log(err);
// }

const express = require("express");
const next = require("next");
const { createServer } = require("http"); // Required for WebSocket support
const { Server } = require("ws"); // WebSocket library
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load environment variables from .env file
dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const routes = require("./routes");
const handle = routes.getRequestHandler(app);

app.prepare()
    .then(() => {
        const server = express();
        const httpServer = createServer(server); // Create HTTP server
        const wss = new Server({ server }); // Create WebSocket server

        server.use(bodyParser.json({ limit: "50mb" }));

        // Enable CORS for all routes
        server.use(cors());

        // Regular routes handled by Next.js
        server.get("*", (req, res) => {
            return handle(req, res);
        });

        // WebSocket connection handling
        wss.on("connection", (ws) => {
            // WebSocket connection established

            ws.on("message", (message) => {
                // Handle incoming messages from WebSocket clients
                console.log("Received message:", message);
            });

            ws.on("close", () => {
                // WebSocket connection closed
                console.log("WebSocket connection closed");
            });

            // Send a message to the WebSocket client
            ws.send("WebSocket connection established");
        });

        const PORT = process.env.PORT || 8080;
        httpServer.listen(PORT, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${PORT}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });

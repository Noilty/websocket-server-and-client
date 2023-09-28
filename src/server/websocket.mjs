'use strict';

const PORT = 8080;
const HOST = 'websocket';

// Server --------------------------------------------------------------------------------------------------------------

import express from "express";
import http from "http";
import cors from "cors";
import {Server} from "socket.io";

const app = express();
const server = http.Server(app);
const wss = new Server(server, {
    cors: {
        origins: ["http://localhost", "https://localhost"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true
    }
});

app.get('*', (req, res) => {
    res.send('Hello, World!');
});

server.listen(PORT, HOST, () => {
    console.info(`server started`);
});

// websocket -----------------------------------------------------------------------------------------------------------

wss.on('connection', function (ws) {
    console.log(`new client [${ws.id}] has connected`);
    ws.on('server:ping', data => {
        console.log(data);
        ws.emit('client:pong', {payload: {message: 'hi, client!'}});
    });
    ws.on('disconnect', socket => {
        console.log(`client [${ws.id}] has disconnected`);
    });
});

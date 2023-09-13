'use strict';

const PORT = 8080;
const HOST = 'websocket';

// Server --------------------------------------------------------------------------------------------------------------

import express from "express";
import http from "http";
import {Server} from "socket.io";

const app = express();
const server = http.Server(app);
const wss = new Server(server, {
    cors: {origin: "http://localhost", allowedHeaders: ["Access-Control-Allow-Origin"], credentials: true}
});

server.listen(PORT, HOST, () => {
    console.info(`server started`);
});

// Websocket -----------------------------------------------------------------------------------------------------------

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

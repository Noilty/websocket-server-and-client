'use strict';

const PORT = 8080;
const HOST = 'websocket';

const express = require('express');

const app = express();
const server = require('http').Server(app);
const wss = require('socket.io')(server, {
    cors: {
        origin: "http://localhost",
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true
    }
});

server.listen(PORT, HOST, () => {
    console.log(`[WEBSOCKET]:'SERVER STARTED'`);
});

wss.on('connection', function (ws) {
    const CLIENT = `[CLIENT]:'${ws.id}'`;
    console.log(`[WEBSOCKET][CONNECTION]` + CLIENT);
    ws.on('disconnect', socket => {
        console.log(`[WEBSOCKET][DISCONNECT]` + CLIENT);
    });
});

'use strict';

(function () {

    const ws = io("ws://172.27.0.5:8080");

    ws.on('connect', () => {
        console.log('connection to websocket established success');
        ws.emit('server:ping', {payload: {message: 'hi, server!'}});
        ws.on('client:pong', data => {
            console.log(data);
        });
    });

})();
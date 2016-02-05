var url = 'ws://echo.websocket.org';
var ws = new WebSocket(url);
console.log('connecting to');
ws.onopen = function () {
  ws.send('Ping'); // Send the message 'Ping' to the server]
  console.log('connected');
};
ws.onerror = function (error) {
  console.error('WebSocket Error: ' + error);
};
ws.onmessage = function (e) {
  console.log('Server: ' + e.data);
};

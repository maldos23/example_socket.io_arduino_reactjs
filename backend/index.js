const express = require("express");
const SerialPort = require("serialport");
const socket = require("socket.io");
const app = express();
const PORT = 8080;
const ReadLine = SerialPort.parsers.Readline;
const parsers = new ReadLine();
const nowSerial = new SerialPort("COM9",{
    baudRate:9600
});
const io = socket.listen(app.listen(PORT,{
    transports:[
        'websocket',
        'polling',
        'long-polling'
    ]
}));

nowSerial.on('open', () => {
    console.log("Puerto abierto");
});

io.on('connect',()=>{
    console.log("Usuario conectado")
})

nowSerial.on('data',(data)=>{
    console.log(data.toString());
    io.emit("arduino:data", {
        entry:data.toString(),
        date: new Date().toISOString()
    });
});

nowSerial.on('err', (err) => {
    console.log(err.message)
});
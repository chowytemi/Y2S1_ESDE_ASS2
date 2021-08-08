
const express=require('express');
const serveStatic=require('serve-static');

const fs = require('fs');
const key = fs.readFileSync('localhost.decrypted.key');
const cert = fs.readFileSync('localhost.crt');

var hostname="localhost";
var port=3001;


const https = require('https');


var app=express();


app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);
    //Checking the incoming request type from the client
    if(req.method!="GET"){
        res.type('.html');
        var msg='<html><body>This server only serves web pages with GET request</body></html>';
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});

const server = https.createServer({ key, cert }, app);

server.listen(port,hostname,function(){

    console.log(`Server hosted at https://${hostname}:${port}`);
});
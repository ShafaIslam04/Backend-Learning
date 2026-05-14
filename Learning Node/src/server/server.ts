import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "../routes/routess";
import config from "../config";


const server : Server = createServer((req:IncomingMessage,res:ServerResponse)=>{
routeHandler(req,res);


});

server.listen(config.port,()=>{
    console.log(`This server is running on port ${config.port}`)
})
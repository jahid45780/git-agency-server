import { Server } from "http";
import mongoose from "mongoose"
import app from "./app";
import { envVers } from "./app/config/env";



let server:Server

const startServer = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://mongoDB:mongoBD45780@cluster0.obozyps.mongodb.net/git_ang?retryWrites=true&w=majority&appName=Cluster0')")
        console.log("connect to DB");
         
        server = app.listen(envVers.PORT,()=>{
            console.log(`app is listen on the port ${envVers.PORT}`);
        }) 
        
    } catch (error) {
        console.log(error);
    }
}

 startServer()

 process.on("SIGINT",()=>{
     console.log("SIGINT detected ... server shutting down",);

     if(server){
        server.close(()=>{
             process.exit(1)
        })
        process.exit(1)
     }
})

process.on("unhandledRejection",(err)=>{
     console.log("UnhandledRejection detected ... server shutting down", err);

     if(server){
        server.close(()=>{
             process.exit(1)
        })
        process.exit(1)
     }
})


process.on("uncaughtException",(err)=>{
     console.log("UncaughtException detected ... server shutting down", err);

     if(server){
        server.close(()=>{
             process.exit(1)
        })
        process.exit(1)
     }
})



import mongoose from "mongoose";
import app from "./app.js";
import config from "./app/config/index.js";
import { Server } from "http";


let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server=app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
}




main();

process.on("unhandledRejection", ()=>{
  console.log(`🙂 unhandledRejection id detected, shutting down the server`)
  if(server){
    server.close(()=>{
      process.exit(1);
    })
  }

 
})

process.on("uncaughtException", ()=>{
  console.log(`🙂 uncaughtException id detected, shutting down the server`)
  process.exit(1);
 })
 
 

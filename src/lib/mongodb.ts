import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error("Please Define MogoDB_URI")
}

let cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}


export async function connectDB() {

    if (cached.conn) {
        console.log("THE MONGODB CONNECTION IS ALREADY EXISTED : ");
        return cached.conn
    }

    if(!cached.promise){
        cached.promise = await mongoose.connect(MONGODB_URI , {
            bufferCommands : false
        })
    }

    cached.conn  = await cached.promise;
    console.log("Connection is created succesfully : ");

    return cached.conn;
}

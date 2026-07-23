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
        return cached.conn
    }

    // Cache the promise itself (un-awaited) so requests arriving mid-handshake
    // join the in-flight connect instead of opening another MongoClient.
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            maxPoolSize: 10,
            minPoolSize: 0,
            serverSelectionTimeoutMS: 10000,
        })
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        // Don't leave a rejected promise cached forever — let the next request retry.
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

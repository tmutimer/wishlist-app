// db.js
import mongoose from 'mongoose';

export async function connectToDb() {
    const {MONGO_DB_USER: user, MONGO_DB_PASSWORD: password, MONGO_DB_URL: host} = process.env

    const MONGO_URI = `mongodb://${user}:${password}@{$host}/`
    
    if (mongoose.connection.readyState >= 1) {
        return; 
    }

    return mongoose.connect(MONGO_URI);
}

export function getDb() {
  return mongoose.connection;
}
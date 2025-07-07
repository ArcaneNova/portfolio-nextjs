import { MongoClient, ObjectId } from "mongodb"
import mongoose from "mongoose"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// For Mongoose models
export async function connect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  return mongoose.connect(uri);
}

// More reliable connection for API routes
export async function connectToDB() {
  try {
    // If already connected, return the existing connection
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    
    // Set strict query to avoid deprecation warnings
    mongoose.set('strictQuery', true);
    
    // Connect with options
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });
    
    console.log("MongoDB connected successfully");
    
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    // Try to reconnect once after a short delay
    console.log("Attempting to reconnect...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    return mongoose.connect(uri);
  }
}

export default clientPromise

export async function getCollection(collectionName: string) {
  const client = await clientPromise
  const db = client.db("portfolio")
  return db.collection(collectionName)
}

export { ObjectId }

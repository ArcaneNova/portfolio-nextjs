import mongoose from "mongoose"
import { MongoClient, ObjectId } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

// For Mongoose models
let mongooseConnection: typeof mongoose | null = null

export async function connect() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection
  }
  
  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
  })
}

// Alias for consistency
export async function connectToDB() {
  return connect()
}

// For legacy raw MongoDB operations - create a MongoClient
let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    return client
  }

  if (clientPromise) {
    return clientPromise
  }

  client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  })

  clientPromise = client.connect()
  return clientPromise
}

export async function getCollection(collectionName: string) {
  // Use Mongoose connection if available for consistency
  if (mongoose.connection.readyState >= 1) {
    const db = mongoose.connection.getClient().db("portfolio")
    return db.collection(collectionName)
  }

  // Fallback to raw MongoClient
  const client = await getMongoClient()
  const db = client.db("portfolio")
  return db.collection(collectionName)
}

export { ObjectId }

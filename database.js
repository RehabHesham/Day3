import { MongoClient } from "mongodb";

let db;
export default async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    let mongoclient = await MongoClient.connect(MONGO_URL);
    db = mongoclient.db("NodejsDay3");
    console.log("Connected successfully with Mongodb");
  } catch (err) {
    console.log("Can't connect to mongodb");
    throw err;
  }
};

export const getDb = () => {
  if (db) return db;
  else throw Error("No Database connected");
};

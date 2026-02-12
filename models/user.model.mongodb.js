import { getDb } from "../database.js";
import { ObjectId } from "mongodb";
import { HTTPError } from "../util/httpError.js";

export default class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async getAll() {
    let db = getDb();
    //console.log(db);
    let users = await db.collection("users").find().toArray();

    console.log(users);
    return users;
  }
  static async getById(id) {
    let db = getDb();
    //console.log(db);
    if (!ObjectId.isValid(id)) {
      throw HTTPError(400, "Invalid ObjectId.");
    }
    let user = await db.collection("users").findOne({ _id: new ObjectId(id) });

    return user;
  }
  static async create(user) {
    let db = getDb();
    let result = await db.collection("users").insertOne(user);
    return result.insertedId;
  }
  static async update(id, user) {
    let db = getDb();
    //console.log(db);
    if (!ObjectId.isValid(id)) {
      throw HTTPError(400, "Invalid ObjectId.");
    }
    let result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: user });
    return result;
  }
  static async delete(id) {
    let db = getDb();
    //console.log(db);
    if (!ObjectId.isValid(id)) {
      throw HTTPError(400, "Invalid ObjectId.");
    }
    let result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  }
}

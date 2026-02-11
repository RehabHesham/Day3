import User from "../models/user.model.mongodb.js";
import { HTTPError } from "../util/httpError.js";

export const getAllUsers = async (req, res, next) => {
  try {
    let users = await User.getAll();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const createUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    let user = new User(name, email, password);
    let ObjectId = await User.create(user);
    return res.status(201).json({
      message: "user created",
      data: { _id: ObjectId, ...user },
    });
  } catch (err) {
    next(err);
  }
};
export const getUserByID = async (req, res, next) => {
  let id = req.params.id;
  if (!id) throw HTTPError(400, "Missing Id");
  let user = await User.getById(id);
  if (!user) throw HTTPError(404, "User not found");
  return res.status(200).json(user);
};
export const updateUser = async (req, res, next) => {
  let id = req.params.id;
  let { name, email, password } = req.body;

  // validate

  let user = await User.getById(id);
  if (!user) return HTTPError(404, "User not found");
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;
  let result = await User.update(id, user);
  return res.status(200).json({
    message: "data updated",
    result,
  });
};
export const deleteUser = async (req, res, next) => {
  let id = req.params.id;
  let result = await User.delete(id);
  return res.status(200).json(result);
};

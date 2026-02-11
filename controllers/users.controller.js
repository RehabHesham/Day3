import mongoose from "mongoose";
import User from "../models/user.model.js";
import { HTTPError } from "../util/httpError.js";

export const getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export const getUserByID = async (req, res, next) => {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      next(HTTPError(400, "Invalid objectId"));
    let user = await User.findById(id);
    if (!user) next(HTTPError(404, "User not found"));
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const createUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    let result = await User.create({ name, email, password });
    return res.status(201).json({
      message: "object created",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = req.body;

    let result = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
    if (!result) next(HTTPError(404, "user not found"));
    return res.status(200).json({
      message: "user updated",
      result: result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "object deleted.",
      result,
    });
  } catch (error) {
    next(error);
  }
};

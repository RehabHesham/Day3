import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserByID,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.mongodb.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
//router.get("/profile",getUserProfile);
router.get("/:id", getUserByID);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

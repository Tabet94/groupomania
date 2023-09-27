import express from "express";

import { getUser, updateUser, deleteUser } from "../controller/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.put("/", deleteUser)

export default router

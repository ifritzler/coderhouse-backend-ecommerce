import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import ClientController from "../controllers/ClientController.js";

const router = Router()

router.get('/', expressAsyncHandler(ClientController.home))

export default router

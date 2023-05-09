import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import ClientController from "../controllers/ClientController.js";

const router = Router()

router.get('/', expressAsyncHandler(ClientController.home))
router.get('/realtime', expressAsyncHandler(ClientController.realtime))

export default router

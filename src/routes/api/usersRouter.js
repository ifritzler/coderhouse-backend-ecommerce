import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import userService from '../../services/users/userService.js'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'

const router = Router()

router.get('/profile', expressAsyncHandler(isLoguedIn), expressAsyncHandler(async (req, res) => {
  const userId = req.session.user.id
  const data = await userService.getUserById(userId)
  const { password, ...user } = data
  res.status(200).json(user)
}))

export default router

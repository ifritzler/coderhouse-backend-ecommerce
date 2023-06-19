import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import userService from '../../services/users/userService.js'
import bcrypt from 'bcrypt'

const router = Router()

router.post('/login', expressAsyncHandler(async (req, res) => {
  const { email, password: plainPassword } = req.body
  const user = await userService.getUserByEmail(email)
  if (!user) {
    return res.status(401).send()
  }
  if (bcrypt.compareSync(user.password, plainPassword)) {
    return res.status(401).send()
  }
  req.session.user = { email: user.email, fullname: user.fullname, role: user.role, id: user.id }
  res.redirect('/')
}))

router.delete('/logout', expressAsyncHandler(async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}))

router.post('/register', expressAsyncHandler(async (req, res) => {
  await userService.createUser(req.body)
  res.redirect('/login')
}))

export default router

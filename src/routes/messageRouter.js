import { Router } from 'express'
import messageService from '../services/messages/MessageService.js'

const router = Router()

router.get('/', async (req, res) => {
  const { limit = 20 } = req.query
  const messages = await messageService.getMessages(limit)
  res.status(200).json({
    success: true,
    payload: messages
  })
})

router.post('/', async (req, res) => {
  const message = await messageService.createMessage(req.body)
  req.clientSocket?.broadcast.emit('new_message', message) ??
    req.ioServer.emit('new_message', message)
  res.status(200).json({
    success: true,
    payload: message
  })
})

export default router

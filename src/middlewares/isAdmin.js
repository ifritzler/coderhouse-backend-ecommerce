import { ROLES } from '../daos/models/users.model.js'

export const isAdmin = (req, res, next) => {
  if (req.session.user.role !== ROLES.ADMIN) {
    return res.status(403).json({
      success: false,
      error: 'You dont have permissions to this endpoint.'
    })
  }
  next()
}

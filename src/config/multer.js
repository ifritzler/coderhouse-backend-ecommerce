import multer, { diskStorage } from 'multer'
import { extname } from 'path'
import ApplicationError from '../exceptions/ApplicationError.js'

const storage = diskStorage({ // multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, 'public/thumbnails')
  },
  filename: function (req, file, cb) {
    const datetimestamp = Date.now()
    cb(null, datetimestamp + '-' + file.originalname)
  }
})

export const upload = multer({ // multer settings
  storage,
  fileFilter: function (req, file, callback) {
    const ext = extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.webp') {
      return callback(new ApplicationError('Only images are permitted', 400))
    }
    callback(null, true)
  },
  limits: {
    files: 3,
    fileSize: 1024 * 1024
  }
})

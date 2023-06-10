import multer from 'multer'
import path from 'path'
import createError from 'http-errors'

const storage = multer.diskStorage({ // multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, 'public/thumbnails')
  },
  filename: function (req, file, cb) {
    const datetimestamp = Date.now()
    cb(null, datetimestamp + '-' + file.originalname)
  }
})

const upload = multer({ // multer settings
  storage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp') {
      return callback(createError(400, 'Only images are permitted'))
    }
    callback(null, true)
  },
  limits: {
    files: 3,
    fileSize: 1024 * 1024 * 5
  }
})

export default upload

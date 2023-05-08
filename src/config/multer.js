const multer = require('multer')
const path = require('path')
const ApplicationError = require('../exceptions/ApplicationError')

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
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new ApplicationError('Only images are permitted', 400))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

module.exports = { upload }

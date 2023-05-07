const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'public/thumbnails')
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + '-' + file.fieldname)
  }
})

const upload = multer({ storage })

module.exports = { upload }

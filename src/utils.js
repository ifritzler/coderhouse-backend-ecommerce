const fs = require('fs')

async function deleteThumbnails (thumbnailsPaths) {
  if (thumbnailsPaths.length > 0) {
    thumbnailsPaths.forEach(async path => {
      if (fs.existsSync('./public' + path) && path !== '/thumbnails/placeholder.jpg') {
        await fs.promises.unlink('./public' + path)
      }
    })
  }
}

module.exports = { deleteThumbnails }

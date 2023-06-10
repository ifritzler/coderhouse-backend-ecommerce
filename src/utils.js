import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

export async function deleteThumbnails (thumbnailsPaths) {
  if (thumbnailsPaths.length > 0) {
    thumbnailsPaths.forEach(async path => {
      if (fs.existsSync('./public' + path) && path !== '/thumbnails/placeholder.jpg') {
        await fs.promises.unlink('./public' + path)
      }
    })
  }
}

export const __dirname = dirname(fileURLToPath(import.meta.url))

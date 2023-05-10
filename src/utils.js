import fs from 'fs'
/**
 * Funcion que me permite eliminar las propiedades que llegan en un objeto indefinidas.
 * Ideal para operaciones crud de update donde posiblemente vengan 1 valor o todos los de la entidad
 * queriendo actualizar.
 */
export function cleanUndefinedProperties (obj) {
  const newObject = {}
  for (const prop in obj) {
    if (typeof obj[prop] !== 'undefined') {
      newObject[prop] = obj[prop]
    }
  }
  return newObject
}

export async function removeUploadImages (path, req = null) {
  if (path) {
    return await fs.promises.unlink(path)
  }

  if (req) {
    if (req.file) {
      const filePath = req.file.destination + '/' + req.file.filename
      return await fs.promises.unlink(filePath)
    }
    if (req.files) {
      for (let i; i < req.files.length; i++) {
        const filePath = req.files[i].destination + '/' + req.files[i].filename
        await fs.promises.unlink(filePath)
      }
      return
    }
  }

  throw new Error('Application broken, you must be pass path or request to removeUploadImage method.')
}

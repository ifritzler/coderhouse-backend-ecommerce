import { unlink, promises } from 'fs'
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
    return unlink(path)
  }

  if (req) {
    if (req.file) {
      const filePath = req.file.destination + '/' + req.file.filename
      return await promises.unlink(filePath)
    }
    if (req.files) {
      for (const file in req.files) {
        const filePath = file.destination + '/' + file.filename
        await promises.unlink(filePath)
      }
    }
  }

  throw new Error('Application broken, you must be pass path or request to removeUploadImage method.')
}

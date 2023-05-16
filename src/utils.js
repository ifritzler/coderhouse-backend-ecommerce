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

export async function removeUploadImages (path, files = []) {
  try {
    if (path) {
      await fs.promises.unlink(path)
    }
    for (let i = 0; i < files.length; i++) {
      const filePath = files[i].destination + '/' + files[i].filename
      await fs.promises.unlink(filePath)
    }
  } catch {}

  // throw new Error('Application broken, you must be pass path or request to removeUploadImage method.')
}

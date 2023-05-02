/**
 * Funcion que me permite eliminar las propiedades que llegan en un objeto indefinidas.
 * Ideal para operaciones crud de update donde posiblemente vengan 1 valor o todos los de la entidad
 * queriendo actualizar.
 */
function cleanUndefinedProperties (obj) {
  const newObject = {}
  for (const prop in obj) {
    if (typeof obj[prop] !== 'undefined') {
      newObject[prop] = obj[prop]
    }
  }
  return newObject
}
/**
 * Funcion que me permite eliminar las propiedades que llegan en un objeto indefinidas.
 * Ideal para operaciones crud de update donde posiblemente vengan 1 valor o todos los de la entidad
 * queriendo actualizar.
 */
export default cleanUndefinedProperties

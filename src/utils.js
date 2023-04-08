function cleanUndefinedProperties(obj) {
    const newObject = {};
    for (let prop in obj) {
        if (typeof obj[prop] !== 'undefined') {
            newObject[prop] = obj[prop];
        }
    }
    return newObject;
}

module.exports = cleanUndefinedProperties;

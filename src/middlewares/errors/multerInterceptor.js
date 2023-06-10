import { MulterError } from 'multer'
import createError from 'http-errors'

const errorMessages = {
  LIMIT_PART_COUNT: 'Too many parts',
  LIMIT_FILE_SIZE: 'File too large', // yes
  LIMIT_FILE_COUNT: 'Too many files', // yes
  LIMIT_FIELD_KEY: 'Field name too long',
  LIMIT_FIELD_VALUE: 'Field value too long',
  LIMIT_FIELD_COUNT: 'Too many fields', // yes
  LIMIT_UNEXPECTED_FILE: 'Unexpected field',
  MISSING_FIELD_NAME: 'Field name missing' // yes
}

const multerInterceptor = (err, _req, _res, next) => {
  if (err instanceof MulterError) {
    if (err.message === errorMessages.LIMIT_FIELD_COUNT) next(createError(400, 'You has posts too many files. Please try again or contact to an administrator.'))

    if (err.message === errorMessages.LIMIT_FILE_SIZE) next(createError(400, 'You posts a file too large. Please upload a file less than 5MB.'))

    if (err.message === errorMessages.LIMIT_FILE_COUNT) next(createError(400, 'You posts too many files. Maximum permmited 3. Please try again.'))

    if (err.message === errorMessages.MISSING_FIELD_NAME) next(createError(400, 'An image must have a name, please rename your file and upload agait'))
  }
  next(err)
}
export default multerInterceptor

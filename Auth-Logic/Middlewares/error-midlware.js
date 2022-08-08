import ApiError from "../exeptions/api-error.js"

export default (err, req, res, next) => {
  console.log(err)
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors })
    next()
  } else { 
    res.status(500).json({ message: 'unexpected error', err })
    next()
  }
}
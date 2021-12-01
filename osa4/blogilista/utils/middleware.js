const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  
  request.token = request.get('authorization')
  if(request.token && request.token.toLowerCase().startsWith('bearer ')){
    request.token = request.token.substring(7)
  }else {
    request.token = null
  }
  next()
  
}
const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  request.user= await User.findById(decodedToken.id)
  next()
}
const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError' ) {
    console.log(error.message)
    return response.status(400).json({error: error.message})
  }
  next(error)
}


module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}
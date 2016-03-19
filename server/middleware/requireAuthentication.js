import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { promisifyAll } from 'bluebird'

promisifyAll(jwt)

// parse token from query string or authorization header as `Bearer ${token}`
const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

export default (req, res, next) => {

  const token = getToken(req)

  if (!token) {
    throw new Error('No token provided')
  }

  return jwt.verifyAsync(token, JWT_SECRET)
    .then(user => {
      req.user = user
      next()
    })
    .catch(next)
}


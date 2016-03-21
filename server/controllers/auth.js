import User from '../models/User'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { promisifyAll } from 'bluebird'

promisifyAll(jwt)

export const handleLogin = (req, res, next) => {

  const { email, password } = req.body

  User.findOne({ email })
    .then(user => {
      if (!user) {
        throw new Error('no user with that email address found')
      }
      return Promise.all([
        user, 
        user.validatePassword(password)
      ])
    })
    .spread((user, passwordsMatch) => {
      if (!passwordsMatch) {
        throw new Error('invalid password')
      }
      const token = jwt.sign(user, JWT_SECRET, {
        expiresIn: 600 // seconds
      })
      res.json({
        token: token
      })
    })
    .catch(next)

}

export const handleSignup = (req, res, next) => {

  let { name, password, email, isAdmin } = req.body

  isAdmin = isAdmin || false

  User.create({
    email,
    name,
    password,
    isAdmin
  })
  .then(user => {
    res.status(201).send(`successfully created user: ${user.email}`)
  })
  .catch(next)

}


// parse token from query string or authorization header as `Bearer ${token}`
const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

export const verifyAuthentication = (req, res, next) => {

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


export const sendUser = (req, res, next) => {
  if (!req.user) {
    throw new Error('no user found on the request object')
  }

  res.json(req.user)
}


import User from '../models/User'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

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
        expiresInMinutes: 10
      })
      res.json({
        user: user,
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


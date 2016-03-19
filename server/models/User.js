import { promisifyAll } from 'bluebird'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

promisifyAll(bcrypt)

// create the schema
const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  createdAt: Date
})

// NOTE: must use es5 function to conserve 'this'
userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareAsync(candidatePassword, this.password)
}

// NOTE: must use es5 function to conserver 'this' value
userSchema.pre('save', function (next) {
  const user = this

  bcrypt.hashAsync(user.password, 8).then(hash => {
    user.password = hash
    next()
  })
})

// create the model to export
const User = mongoose.model('User', userSchema)

export default User

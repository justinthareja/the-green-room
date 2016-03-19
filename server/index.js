import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import router from './router'
import mongoose from 'mongoose'
import handleError from './middleware/handleError'
import { DB_URI, JWT_SECRET } from './config'

const app = express()

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? process.env.PORT : 1337
const publicPath = path.join(__dirname, '/../client/build')

// use static to serve the public path at '/'
app.use(express.static(publicPath))

// use body parser to get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// set-up API routes
app.use('/api', router)

// default error-handling middleware
app.use(handleError)

// connect to mongoose database
mongoose.connect(DB_URI)
mongoose.Promise = require('bluebird')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'db connection error'))
db.once('open', console.log.bind(console, 'successfully established connection to db:', DB_URI));

// launch the server
app.listen(port, () => {
  console.log('Launch party on port:', port)
})

export default app


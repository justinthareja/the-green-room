import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import router from './router'

const app = express()

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? process.env.PORT : 1337
const publicPath = path.join(__dirname, '/../client/build')

// use static to serve the public path at '/'
app.use(express.static(publicPath))

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// default error-handling middleware
app.use((err, req, res, next) => res.status(400).send(err))

// inject API routes
app.use('/api', router)


app.listen(port, () => {
  console.log('Launch party on port:', port)
})

export default app


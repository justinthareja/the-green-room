import express from 'express'
import path from 'path'
import router from './router'

const app = express()

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? process.env.PORT : 1337
const publicPath = path.join(__dirname, '/../client/build')

// Serve up the react app on '/' 
app.use(express.static(publicPath))

// Default error handling middleware
app.use((err, req, res, next) => { res.status(400).send(err) })

// Inject routes
router(app)

app.listen(port, () => {
  console.log('Listening on port:', port)
})

export default app


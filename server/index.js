import express from 'express'
import path from 'path'
import router from './router'

const app = express()
const port = process.env.PORT || 1337

// Serve up the react app on '/' 
app.use(express.static(path.join(__dirname, '/../client/build')))

// Default error handling middleware
app.use((err, req, res, next) => { res.status(400).send(err) })

// Inject routes
router(app)

app.listen(port, () => {
  console.log('Listening on port:', port)
})

export default app


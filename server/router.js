import express from 'express'
import requireAuthentication from './middleware/requireAuthentication'
import { handleLogin, handleSignup } from './controllers/auth'
import { 
  generateGoogleMapsUrl,
  sendConditions,
  sendTweets 
} from './controllers/proxy'

const router = express.Router()

router.get('/conditions/:id', sendConditions)
router.get('/tweets/:hashtag', sendTweets)
router.get('/gmaps', generateGoogleMapsUrl)

// authentication routes
router.post('/login', handleLogin)
router.post('/signup', handleSignup)

router.get('/protected', requireAuthentication, (req, res, next) => {
  res.json(req.user)
})

export default router

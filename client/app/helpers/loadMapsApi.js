import $script from 'scriptjs'

const API_KEY = 'AIzaSyBoeoemBLlJl79N5EwuPW4fOxdtjUd8VNE'
const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`

export default () => {
  return new Promise((resolve, reject) => {
    
    if (!!window.google) {
      return resolve()
    }

    $script(API_URL, () => {
      resolve()
    }, (err) => {
      reject(err)
    })
  })
  
}
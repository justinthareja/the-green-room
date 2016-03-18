import $script from 'scriptjs'
import fetch from 'isomorphic-fetch'

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    $script(src, () => {
      resolve()
    }, (err) => {
      reject(err)
    })
  })
}

const loadGoogleMaps = () => {
  if (window.google) {
    return Promise.resolve()
  }
  return fetch('/api/gmaps')
    .then(res => res.json())
    .then(res => loadScript(res.url))
}

export default loadGoogleMaps
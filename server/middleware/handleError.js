export default (err, req, res, next) => 
  res.status(400).send({ error: err.message })
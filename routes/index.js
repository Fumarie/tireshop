const Router = require('express')
const router = new Router()

const tireRouter = require('./tire.routes')
router.use('/tire', tireRouter)

module.exports = router
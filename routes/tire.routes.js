const Router = require('express')
const router = new Router()
const tireController = require('../controllers/tire.controller')

router.get('/', tireController.getAllTires)
router.get('/:id', tireController.getTire)

module.exports = router
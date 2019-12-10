import express from 'express'
import * as controller from '../controllers/itemController'
import * as middleware from '../middlewares/auth'

let router = express.Router()
router.use(middleware.auth)

router.route('/')
    .post(controller.addItem)
    .get(controller.getItems)

router.route('/:id/')
    .put(controller.updateItem)
    .get(controller.getItem)
    .delete(controller.deleteItem)


export default router

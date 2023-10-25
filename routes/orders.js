// Controllers
const OrdersController = require('../controllers/OrdersController.js');
const Router = require('express').Router;
const router = new Router();
const passport = require('passport');

const adminMiddleware = require('../middlewares/adminMiddleware');

// For customer
router.post('/create-order', passport.authenticate('jwt', { session: false }), OrdersController.create);
router.get('/get-my-orders', passport.authenticate('jwt', { session: false }), OrdersController.getForCustomer);

// For admin
router.delete('/delete-order', passport.authenticate('jwt', { session: false }), adminMiddleware, OrdersController.delete);
router.get('/get-orders', passport.authenticate('jwt', { session: false }), adminMiddleware, OrdersController.get);

module.exports = router;
const passport = require('passport');
// Controllers
const AuthController = require('../controllers/AuthController')
const Router = require('express').Router
const router = new Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register, AuthController.login);

module.exports = router;
// Controllers
const AdminController = require('../controllers/AdminsController')
const Router = require('express').Router
const router = new Router();

router.post('/register-admin', AdminController.registerAdmin);
router.get('/get-admins', AdminController.get);

module.exports = router;
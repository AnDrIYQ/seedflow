// Controllers
const SeedsController = require('../controllers/SeedsController');
const Router = require('express').Router;
const router = new Router();
const passport = require('passport');

const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/create-seed', passport.authenticate('jwt', { session: false }), adminMiddleware, SeedsController.create);
router.put('/update-seed', passport.authenticate('jwt', { session: false }), adminMiddleware, SeedsController.update);
router.delete('/delete-seed', passport.authenticate('jwt', { session: false }), adminMiddleware, SeedsController.delete);

router.get('/get', SeedsController.get);

module.exports = router;
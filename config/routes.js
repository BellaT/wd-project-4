var express = require('express'),
    router  = express.Router();

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);
  
router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/login').post(authenticationsController.login);
router.route('/register').post(authenticationsController.register);
router.route('/auth/facebook').post(authenticationsController.facebook);

module.exports = router;

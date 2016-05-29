var express = require('express'),
    router  = express.Router();

var usersController = require('../controllers/usersController');

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex)
  .post(usersController.usersCreate);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

module.exports = router;

let UserController = require('../Controllers/UserController');

module.exports = function (router) {
  router.get('/images/token', ImageController.getToken);


}
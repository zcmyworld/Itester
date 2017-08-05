let SystemController = require('../Controllers/SystemController');

module.exports = function (router) {
  router.get('/system/info/cpu_temp', SystemController.cputemp);
}
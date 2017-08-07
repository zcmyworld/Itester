let SystemController = require('../Controllers/SystemController');

module.exports = function (router) {
  router.get('/ws/system/info/cpu_temp', SystemController.ws_cputemp);
}
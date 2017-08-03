/**
 * 图片上传模块
 */
let qiniu = require('qiniu');

class ImageController {
  /**
   * 获取七牛上传token
   */
  async getToken(ctx) {
    let bucketName = 'activity';
    qiniu.conf.ACCESS_KEY = '1BbnKiBDh2Ql1SA4QUC45Jc0c1Y-rTvsUmXYFtLE';
    qiniu.conf.SECRET_KEY = 'Cs9PMrTNfC3sF7O9BO-TdPTlY1gXtYbd99JcAzD-';
    let putPolicy = new qiniu.rs.PutPolicy({
      scope: bucketName
    });
    let token = putPolicy.uploadToken();
    ctx.body = {
      code: 0,
      data: {
        token: token
      }
    }
  }
}

module.exports = new ImageController();
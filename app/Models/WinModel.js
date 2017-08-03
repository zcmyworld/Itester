let Pool = require('./Pool');
let ToolTime = require('../Tools/ToolTime');

class WinModel {
  /**
   * 获取最新一个中奖名单
   */
  async getWinnerList(start, end) {
    let sql = 'select * from wins order by id DESC limit ?,?';
    let args = [start, end];
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

  async getWinCount() {
    let sql = "select count(id) as count from wins";
    let args = [];
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

}

module.exports = new WinModel;
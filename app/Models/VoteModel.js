let DB = require('./Pool');
let Pool = DB;
let ToolTime = require('../Tools/ToolTime');

class VoteModel {
  /**
   * 根据选民查找记录
   * @voted 被投票人 
   * @voter 选民
   */
  async getInfoByVoter(voted, voter) {
    let sql = 'select * from votes where voter = ? order by createdAt DESC';
    let args = [voter];
    let ret = await Pool.queryAsync(sql, args);
    if (ret.length == 0) {
      return null;
    }
    return ret[0];
  }


  /**
   * 记录投票人
   * @voted 被投票人 
   * @voter 选民
   */
  async vote(voted, voter) {
    let sql = 'insert into votes (voted, voter, createdAt) values(?, ?, ?)';
    let args = [voted, voter, ToolTime.getTimestamp()];
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

}

module.exports = new VoteModel;
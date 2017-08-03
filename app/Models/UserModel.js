let Pool = require('./Pool');
let ToolTime = require('../Tools/ToolTime');

class UserModel {
  async vote(openid) {
    let sql = 'update users set votenum=votenum+1 where openid=?';
    let args = [openid];
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

  /**
   * 获取排名
   */
  async getUserRank(openid, votenum) {
    let sql = 'select count(id) as count  from users where votenum >= ? and phone!=""';
    let args = [votenum]
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

  async hotsearch(openid) {
    let sql = 'update users set hotsearch=hotsearch+1 where openid=?';
    let args = [openid];
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

  async getUserByOpenid(openid) {
    let sql = 'select * from users where openid= ?';
    let args = [openid]
    let ret = await Pool.queryAsync(sql, args);
    if (ret.length == 0) {
      return null;
    }
    return ret[0];
  }
  async getUserCount(searchkey) {
    let sql = "select count(id) as count from users where phone != ''";
    let args = [];
    if (searchkey) {
      sql = "select count(id) as count from users where phone != '' and id = ?";
      args = [searchkey];
    }
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

  async getUserListByHotSearch() {
    let sql = "select * from users where phone != '' order by hotsearch DESC limit ?,?";
    let args = [0, 4];
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

  async getUserListByVotenum(start, end, searchkey) {
    let sql = "select * from users where phone != '' order by votenum DESC limit ?,?";
    let args = [start, end];
    if (searchkey) {
      sql = "select * from users where phone != '' and id = ? order by votenum DESC limit ?,?";
      args = [searchkey, start, end];
    }
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

  async getUserListByTime(start, end, searchkey) {
    let sql = "select * from users where phone != '' order by createdAt DESC limit ?,?";
    let args = [start, end];
    if (searchkey) {
      sql = "select * from users where phone != '' and id = ? order by createdAt DESC limit ?,?";
      args = [searchkey, start, end];
    }
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

  async createUser(openid, nickname, headimgurl) {
    let sql = "insert into users (openid, nickname, headimgurl, createdAt) values (?,?,?,?)";
    let args = [openid, nickname, headimgurl, ToolTime.getTimestamp()];
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }

  async updateUser(openid, actimgurl, slogan, phone, isCar, plancar, carshop, realname) {
    let sql = "update users set actimgurl =? , slogan=?, phone=?, isCar=?, plancar=?, carshop=?, realname=? where openid=?";
    let args = [actimgurl, slogan, phone, isCar, plancar, carshop, realname, openid];
    let ret = await Pool.queryAsync(sql, args);
    return ret;
  }
}

module.exports = new UserModel;
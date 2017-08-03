/**
 * 完成微信授权
 */

let WechatService = require('../Services/WechatService');
let UserService = require('../Services/UserService');

class UserController {
  async wechatGetAccessToken(ctx) {
    let code = ctx.query.code;
    let state = ctx.query.state;
    if (!code) {
      return
    }
    let wx = new WechatService(code);
    let user = await wx.getUser(code);
    //将用户信息保存到数据库
    await UserService.create(user.openid, user.nickname, user.headimgurl);

    ctx.session.openid = user.openid;
    ctx.session.nickname = user.nickname;
    ctx.session.headimgurl = user.headimgurl;

    ctx.redirect(`${state}?openid=${user.openid}`)
    // ctx.redirect(`/page/homepage?openid=${user.openid}`)
  }

  /**
   * 用户进行投票， ajax 请求
   * @param openid {POST} 被投票人openid
   */
  async vote(ctx) {
    let voted_openid = ctx.request.body.openid;

    let voter_openid = ctx.session.openid;
    if (!voted_openid) {
      ctx.body = {
        code: -1,
        message: '用户不存在'
      }
      return;
    }

    await UserService.vote(voted_openid, voter_openid);

    ctx.body = {
      code: 0,
      message: '',
      data: {}
    }
  }

  /**
   * 参与互动
   * @param {POST} realname
   * @param {POST} phone
   * @param {POST} actimgurl
   * @param {POST} slogan
   * @param {POST} isCar
   * @param {POST} plancar
   * @param {POST} carshop
   */
  async join(ctx) {
    let realname = ctx.request.body.realname;
    let phone = ctx.request.body.phone;
    let actimgurl = ctx.request.body.actimgurl;
    let slogan = ctx.request.body.slogan;
    let isCar = ctx.request.body.isCar;
    let plancar = ctx.request.body.plancar;
    let carshop = ctx.request.body.carshop;
    let openid = ctx.session.openid;

    let ret = await UserService.join(openid, actimgurl, slogan, phone, isCar, plancar, carshop, realname);

    ctx.body = {
      code: 0,
      message: '',
      data: {}
    }
  }
}

module.exports = new UserController();
let UserService = require('../Services/UserService');

class PageController {
  async main(ctx) {
    await ctx.render('main', {

    });
  }
  /**
   * 首页
   */
  async homepage(ctx) {
    let openid = ctx.session.openid;
    let headimgurl = ctx.session.headimgurl;
    let nickname = ctx.session.nickname;
    await ctx.render('homepage', {
      openid: openid,
      headimgurl: headimgurl,
      nickname: nickname
    });
  }

  /**
   * 发布页面
   */
  async join(ctx) {
    let openid = ctx.session.openid;
    let headimgurl = ctx.session.headimgurl;
    let nickname = ctx.session.nickname;
    let user = await UserService.info(openid);
    await ctx.render('join', {
      openid: openid,
      headimgurl: headimgurl,
      nickname: nickname,
      realname: user.info.realname,
    });
  }

  /**
   * 中奖页面
   */
  async win(ctx) {
    let openid = ctx.session.openid;
    let headimgurl = ctx.session.headimgurl;
    let nickname = ctx.session.nickname;

    let start = ctx.query.start ? ctx.query.start : 1;

    let ret = await UserService.winList(start);

    await ctx.render('win', {
      openid: openid,
      headimgurl: headimgurl,
      nickname: nickname,
      list: ret.list,
      count: ret.count
    });
  }

  /**
   * 投票页面
   * $param {GET} sortkey 排序关键字
   * $param {GET} start 起始页
   * $param {GET} searchkey 搜索关键字
   */
  async vote(ctx) {
    let openid = ctx.session.openid;
    let headimgurl = ctx.session.headimgurl;
    let nickname = ctx.session.nickname;

    let start = ctx.query.start ? ctx.query.start : 1;
    let sortkey = ctx.query.sortkey ? ctx.query.sortkey : 'vote';
    let searchkey = ctx.query.searchkey;

    let ret = await UserService.list(start, sortkey, searchkey);

    await ctx.render('vote', {
      openid: openid,
      headimgurl: headimgurl,
      nickname: nickname,
      count: ret.count,
      list: ret.list
    });

  }

  /**
   * 个人主页
   */
  async userinfo(ctx) {
    let openid = ctx.session.openid;
    let headimgurl = ctx.session.headimgurl;
    let nickname = ctx.session.nickname;

    let searchOpenId = ctx.request.query.ukey;

    if (!searchOpenId) {
      searchOpenId = openid;
    }

    let user = await UserService.info(searchOpenId);

    await ctx.render('userinfo', {
      openid: openid,
      headimgurl: user.info.headimgurl,
      nickname: user.info.nickname,
      slogan: user.info.slogan,
      realname: user.info.realname,
      actimgurl: user.info.actimgurl,
      votenum: user.info.votenum,
      id: user.info.id,
      rank: user.rank
    });
  }
}

module.exports = new PageController();
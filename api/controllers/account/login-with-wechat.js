const axios = require('axios');
const jwt = require('jsonwebtoken');

const appId = sails.config.custom.appId;
const appSecret = sails.config.custom.appSecret;
const jwtSeed = sails.config.custom.jwtSeed;

/**
 * WechatLoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  friendlyName: 'Login with Wechat',

  description: 'Login with Wechat',

  inputs: {
    code: {
      description: 'The code returned from Wechat',
      example: 'abc123v2',
      required: true,
    },
  },

  fn: async function ({ code }) {
    const config = {
      appId: appId,
      secret: appSecret
    };

    try {
      let response = await axios.get(
        'https://api.weixin.qq.com/sns/jscode2session',
        {
          params: {
            appid: config.appId,
            secret: config.secret,
            js_code: code,
            grant_type: 'authorization_code',
          },
        }
      );

      const session_key = response.data.session_key;
      const openid = response.data.openid;
      if (!session_key || !openid || openid === '') {
        return this.res.badRequest(response.data);
      }

      const user = await User.findOrCreate({ openid: openid }, { openid: openid });

      const token = jwt.sign({ userId: user.id }, jwtSeed);

      return this.res.ok({
        token: token
      });
    } catch (error) {
      return this.res.serverError(error);
    }
  },
};

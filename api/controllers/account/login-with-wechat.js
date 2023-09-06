const axios = require('axios');

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
      appId: 'YOUR_APP_ID', // replace with your App ID
      secret: 'YOUR_APP_SECRET', // replace with your App Secret
    };

    // Get access token
    try {
      let response = await axios.get(
        'https://api.weixin.qq.com/sns/oauth2/access_token',
        {
          params: {
            appid: config.appId,
            secret: config.secret,
            code: code,
            grant_type: 'authorization_code',
          },
        }
      );

      const access_token = response.data.access_token;
      const openid = response.data.openid;

      // Use access token to get user info
      response = await axios.get('https://api.weixin.qq.com/sns/userinfo', {
        params: {
          access_token: access_token,
          openid: openid,
          lang: 'en_US',
        },
      });

      return this.res.ok(response.data);
    } catch (error) {
      return this.res.serverError(error);
    }
  },
};

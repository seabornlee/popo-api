module.exports = {
  friendlyName: "View profile",

  description: "Display profile page.",

  exits: {
    success: {},
  },

  fn: async function (inputs, exits) {
    const user = this.req.me;
    return exits.success({
      userInfo: {
        nickName: user.nickName,
        city: user.city,
        gender: user.gender,
        avatarUrl: user.avatarUrl,
      },
    });
  },
};

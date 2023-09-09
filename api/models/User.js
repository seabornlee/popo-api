/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    nickName: {
      type: "string",
      required: false,
      description: "Full representation of the user's name.",
      maxLength: 120,
      example: "Mary Sue van der McHenst",
    },

    city: {
      type: "string",
      required: false,
      description: "User city.",
      maxLength: 120,
      example: "大理",
    },

    gender: {
      type: "number",
      isIn: [0, 1, 2],
      required: false,
    },

    avatarUrl: {
      type: "string",
      required: false,
      maxLength: 500,
      example: "https://....",
    },

    tosAcceptedByIp: {
      type: "string",
      description:
        "The IP (ipv4) address of the request that accepted the terms of service.",
      extendedDescription:
        "Useful for certain types of businesses and regulatory requirements (KYC, etc.)",
      moreInfoUrl: "https://en.wikipedia.org/wiki/Know_your_customer",
    },

    lastSeenAt: {
      type: "number",
      description:
        "A JS timestamp (epoch ms) representing the moment at which this user most recently interacted with the backend while logged in (or 0 if they have not interacted with the backend at all yet).",
      example: 1502844074211,
    },

    openid: {
      type: "string",
      description: "Wechat openid.",
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    groups: {
      collection: "group",
      via: "members",
    },
  },
};

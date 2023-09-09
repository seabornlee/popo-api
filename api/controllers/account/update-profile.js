module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for the logged-in user.',


  inputs: {

    nickName: {
      type: 'string'
    },

    city: {
      type: 'string'
    },

    gender: {
      type: 'string'
    },

    avatarUrl: {
      type: 'string'
    },
  },


  exits: {
  },


  fn: async function ({nickName, avatarUrl, gender, city}) {
    var valuesToSet = {
      nickName,
      avatarUrl,
      gender,
      city
    };
    await User.updateOne({id: this.req.me.id })
    .set(valuesToSet);
  }
};

/**
 * GroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      let params = req.allParams();
      let attributes = {
        name: params.name,
        tags: params.tags,
        location: params.location,
        images: params.images,
        owner: req.me.id, // assuming the ownerId is sent in the request
      };
      let newGroup = await Group.create(attributes).fetch();
      return res.json(newGroup);
    } catch (err) {
      return res.serverError(err);
    }
  },

  findOne: async function (req, res) {
    // find group by id and populate owner and top 5 memebers order by createdAt desc
    const id = req.params.id;
    try {
      const group = await sails.services.groupservice.getGroup(id);
      console.log(group);
      return res.json(group);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // list all order by createdAt desc
  list: async function (req, res) {
    try {
      let groups = await Group.find().populate("owner").sort("createdAt DESC");
      return res.json(groups);
    } catch (err) {
      return res.serverError(err);
    }
  },

  join: async function (req, res) {
    try {
      const groupId = req.params.id;
      const userId = req.me.id;

      const group = await Group.findOne({ id: groupId });
      const user = await User.findOne({ id: userId });

      if (!group || !user) {
        return res.badRequest();
      }

      await User.addToCollection(userId, "groups").members(groupId);

      return res.json(await sails.services.groupservice.getGroup(groupId));
    } catch (err) {
      return res.serverError(err);
    }
  },

  joined: async function (req, res) {
    try {
      const userId = req.me.id;
      const user = await User.findOne({ id: userId }).populate("groups");
      return res.json(user.groups);
    } catch (err) {
      return res.serverError(err);
    }
  },
};

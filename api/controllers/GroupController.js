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

  // list all order by createdAt desc
  list: async function (req, res) {
    console.log("-------list ----------");
    try {
      let groups = await Group.find().sort("createdAt DESC");
      return res.json(groups);
    } catch (err) {
      return res.serverError(err);
    }
  },
};

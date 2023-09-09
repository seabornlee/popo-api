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
};

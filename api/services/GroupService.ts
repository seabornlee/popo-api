module.exports = {
  getGroup: async (id) => {
    const group = await Group.findOne(id)
      .populate("owner")
      .populate("members", { sort: "createdAt DESC" });
    group.memberCount = group.members.length;
    group.members = group.members.slice(0, 5);
    return group;
  },
};

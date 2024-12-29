const Friend = require("../models/Friend");

exports.addFriend = async (req, res) => {
  const { name } = req.body;
  const friend = new Friend({ name, user: req.user.id });

  try {
    await friend.save();
    res.status(201).json(friend);
  } catch (err) {
    res.status(500).json({ error: "Error adding friend!" });
  }
};

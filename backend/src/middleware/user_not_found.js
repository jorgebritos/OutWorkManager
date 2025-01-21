import User from "../database/Models/User.js";

export const user_not_found = async (req, res, next) => {
  const params = req.params;

  try {
    const user = await User.findOne({ _id: params.user });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

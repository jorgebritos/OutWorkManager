import User from "../Models/User.js";

class userDao {
  async index(skip, limit, query) {
    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { users, total };
  }

  async create(data) {
    const user = new User(data)
    const user_saved = await user.save();

    return user_saved
  }

  async update(user, data) {
    return await User.findOneAndUpdate(
      { _id: user },
      { $set: { ...data } },
      { new: true, runValidators: true }
    );
  }

  async destroy(_id) {
    return await User.findOneAndDelete({ _id });
  }
}

export default new userDao();

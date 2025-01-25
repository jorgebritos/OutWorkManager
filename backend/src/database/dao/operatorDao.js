import Enterprise from "../Models/Enterprise.js";
import Operator from "../Models/Operator.js";

class operatorDao {
  async index(enterprise, skip, limit, query) {
    const current_enterprise = await Enterprise.findOne({ slug: enterprise });

    const operators = await Operator.find({
      enterprise_id: current_enterprise._id,
      ...query,
    })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Operator.countDocuments({
      enterprise_id: current_enterprise._id,
    });

    return { operators, total };
  }

  async show(operator) {
    return await Operator.findById(operator);
  }

  async update(operator, data) {
    return await Operator.findOneAndUpdate(
      { _id: operator },
      { $set: { ...data } },
      { new: true, runValidators: true }
    );
  }

  async create(enterprise, data) {
    const current_enterprise = await Enterprise.findOne({ slug: enterprise });

    const operator = new Operator({
      ...data,
      enterprise_id: current_enterprise._id,
    });

    await operator.save();

    return await enterprise.save();
  }

  async destroy(_id) {
    return await Operator.findOneAndDelete({ _id });
  }
}

export default new operatorDao();

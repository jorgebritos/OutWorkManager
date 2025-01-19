import Enterprise from "../Models/Enterprise.js";
import slugify from "slugify";

class enterpriseDao {
  async index(skip, limit, query) {
    const total = await Enterprise.countDocuments(query);
    const enterprises = await Enterprise.find(query)
      .populate("user_id")
      .lean()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { enterprises, total };
  }

  async show(slug) {
    return await Enterprise.findOne({ slug });
  }

  async create(data) {
    let enterprise = new Enterprise({
      ...data,
      name: data.name,
      slug: slugify(data.name),
    });

    return await enterprise.save();
  }

  async update(slug, data) {
    return await Enterprise.findOneAndUpdate(
      { slug },
      { $set: { ...data, slug: data.name ? slugify(data.name) : undefined } },
      { new: true, runValidators: true }
    );
  }

  async destroy(slug) {
    return await Enterprise.findOneAndDelete({ slug });
  }
}

export default new enterpriseDao();

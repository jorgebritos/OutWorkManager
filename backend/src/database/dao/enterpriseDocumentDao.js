import Document from "../Models/Document.js";
import Enterprise from "../Models/Enterprise.js";

class enterpriseDocumentDao {
  async index(enterprise, skip, limit, query) {
    const current_enterprise = await Enterprise.findOne({ slug: enterprise });

    const documents = await Document.find({
      enterprise_id: current_enterprise._id,
      ...query,
    })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Document.countDocuments({
      enterprise_id: current_enterprise._id,
    });

    return { documents, total };
  }

  async show(document) {
    return await Document.findById(document);
  }

  async create(enterprise, data) {
    const current_enterprise = await Enterprise.findOne({ slug: enterprise });

    const document = new Document({ ...data, enterprise_id: current_enterprise._id });

    await document.save();

    return await enterprise.save();
  }

  async update(document, data) {
    return await Document.findOneAndUpdate(
      { _id: document },
      { $set: { ...data } },
      { new: true, runValidators: true }
    );
  }

  async destroy(_id) {
    return await Document.findOneAndDelete({ _id });
  }
}

export default new enterpriseDocumentDao();

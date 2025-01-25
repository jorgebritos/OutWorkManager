import Document from "../Models/Document.js";
import Operator from "../Models/Operator.js";

class operatorDocumentDao {
  async index(operator, skip, limit, query) {

    const documents = await Document.find({
      operator_id: operator,
      ...query,
    })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Document.countDocuments({
      operator_id: operator,
    });

    return { documents, total };
  }

  async show(document) {
    return await Document.findById(document);
  }

  async create(operator, data) {
    const document = new Document({ ...data, operator_id: operator });

    await document.save();

    return await operator.save();
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

export default new operatorDocumentDao();

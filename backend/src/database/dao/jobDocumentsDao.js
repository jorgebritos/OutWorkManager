import Document from "../Models/Document.js";

class jobDocumentDao {
  async index(job, skip, limit, query) {

    const documents = await Document.find({
      job_id: job,
      ...query,
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    const total = await Document.countDocuments({
      job_id: job,
    });

    return { documents, total };
  }

  async show(document) {
    return await Document.findById(document);
  }

  async create(job, data) {
    const document = new Document({ ...data, job_id: job });

    await document.save();

    return await job.save();
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

export default new jobDocumentDao();

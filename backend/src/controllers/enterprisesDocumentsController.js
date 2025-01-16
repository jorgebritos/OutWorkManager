import Document from "../Database/Esquemas/Document.js";
import Enterprise from "../Database/Esquemas/Empresa.js";

export const index = async (req, res) => {
  const params = req.params;
  const page = Number(req.query.page ? req.query.page : 1);

  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const enterprise = await Enterprise.findOne({ slug: params.enterprise });

    const documents = await Document.find({ enterprise_id: enterprise._id })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Document.countDocuments({
      enterprise_id: enterprise._id,
    });

    const last_page = Math.ceil(total / limit);

    res.json({
      documents,
      meta: { last_page, total, current_page: page },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  const params = req.params;
  const data = req.body;

  try {
    const enterprise = await Enterprise.findOne({ slug: params.enterprise });

    const document = new Document({ ...data, enterprise_id: enterprise._id });

    await document.save()

    res.json({
      document,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const show = async (req, res) => {
  const params = req.params;

  try {
    const document = await Document.findById(params.document);

    res.json({
      document,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

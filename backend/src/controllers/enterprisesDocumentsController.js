import Document from "../Database/Esquemas/Document.js";
import Enterprise from "../Database/Esquemas/Empresa.js";

export const index = async (req, res) => {
  const params = req.params;
  const { search, page } = req.query;

  const current_page = Number(page ? page : 1);
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const enterprise = await Enterprise.findOne({ slug: params.enterprise });

    const query = {};

    if (search) query.title = { $regex: search, $options: "i" };

    const documents = await Document.find({
      enterprise_id: enterprise._id,
      ...query,
    })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Document.countDocuments({
      enterprise_id: enterprise._id,
    });

    const last_page = Math.ceil(total / limit);

    res.json({
      documents,
      meta: { last_page, total, current_page },
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

    await document.save();

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

export const destroy = async (req, res) => {
  const { document: _id } = req.params;

  try {
    
    await Document.findOneAndDelete({ _id });

    res.json({
      message: 'OK',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import jobDocumentDao from "../database/dao/jobDocumentsDao.js";

export const index = async (req, res) => {
  const { job } = req.params;
  const { search, page } = req.query;

  const current_page = Number(page ? page : 1);
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const query = {};

    if (search) query.title = { $regex: search, $options: "i" };

    const { documents, total } = await jobDocumentDao.index(
      job,
      skip,
      limit,
      query
    );

    const last_page = Math.ceil(total / limit);

    res.json({
      documents,
      meta: { last_page, total, current_page },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const show = async (req, res) => {
  const params = req.params;

  try {
    const document = await jobDocumentDao.show(params.document);

    res.json({
      document,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  const params = req.params;
  const data = req.body;

  try {
    const document = await jobDocumentDao.create(
      params.job,
      data
    );

    res.json({
      document,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  const params = req.params;
  const data = req.body;

  try {
    const document = await jobDocumentDao.update(params.document, data);

    res.json({
      document,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const destroy = async (req, res) => {
  const { document } = req.params;

  try {
    await jobDocumentDao.destroy(document);

    res.json({
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

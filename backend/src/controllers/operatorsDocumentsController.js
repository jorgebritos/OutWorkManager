import operatorDocumentDao from "../database/dao/operatorDocumentDao.js";

export const index = async (req, res) => {
  const { operator } = req.params;
  const { search, page } = req.query;

  const current_page = Number(page ? page : 1);
  const limit = 5;
  const skip = (page - 1) * limit;

  const query = {};
  try {

    if (search) query.title = { $regex: search, $options: "i" };

    const { documents, total } = await operatorDocumentDao.index(
      operator,
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
    const document = await operatorDocumentDao.show(params.document);

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
    const document = await operatorDocumentDao.create(
      params.operator,
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
    const document = await operatorDocumentDao.update(params.document, data);

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
    await operatorDocumentDao.destroy(document);

    res.json({
      message: "OK",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

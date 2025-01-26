import enterpriseDao from "../database/dao/enterpriseDao.js";

export const index = async (req, res) => {
  const { filter, search, page } = req.query;

  const current_page = Number(page ? page : 1);
  const limit = 15;
  const skip = (page - 1) * limit;
  try {
    const query = {};
    if (filter !== undefined && filter !== null) {
      query.is_valid = filter === "true";
    }

    if (search) query.name = { $regex: search, $options: "i" };

    const { enterprises, total } = await enterpriseDao.index(
      skip,
      limit,
      query
    );

    const last_page = Math.ceil(total / limit);

    res.status(200).json({
      enterprises,
      meta: {
        last_page,
        total,
        current_page,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const show = async (req, res) => {
  const params = req.params;

  try {
    const enterprise = await enterpriseDao.show(params.enterprise);

    res.status(200).json({
      enterprise: {
        ...enterprise.toObject(),
        user_id: undefined,
        user: enterprise.user_id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  const data = req.body;

  try {
    const enterprise = await enterpriseDao.create(data);

    res.status(200).json({
      enterprise,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  const params = req.params;
  try {
    const data = req.body;

    const enterprise = await enterpriseDao.update(params.enterprise, data);

    res.status(200).json({ enterprise });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const destroy = async (req, res) => {
  const { enterprise } = req.params;

  try {
    await enterpriseDao.destroy(enterprise);

    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

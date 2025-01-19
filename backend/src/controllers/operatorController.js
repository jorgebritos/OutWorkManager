import operatorDao from "../database/dao/operatorDao.js";

export const index = async (req, res) => {
  const { enterprise } = req.params;
  const { filter, search, page } = req.query;

  const current_page = Number(page ? page : 1);
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const query = {};

    if (filter !== undefined && filter !== null) {
      query.is_valid = filter === "true";
    }

    if (search) query.name = { $regex: search, $options: "i" };

    const { operators, total } = await operatorDao.index(
      enterprise,
      skip,
      limit,
      query
    );

    const last_page = Math.ceil(total / limit);

    res.status(200).json({
      operators,
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
    const operator = await operatorDao.show(params.operator);

    res.status(200).json({
      operator,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  const data = req.body;

  try {
    const enterprise = await operatorDao.create(data);

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

    const operator = await operatorDao.update(params.operator, data);

    res.status(200).json({ operator });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const destroy = async (req, res) => {
  const { operator } = req.params;

  try {
    await operatorDao.destroy(operator);

    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

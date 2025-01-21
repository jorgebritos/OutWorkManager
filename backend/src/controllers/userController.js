import userDao from "../database/dao/userDao.js";

export const index = async (req, res) => {
  const { search, page, role } = req.query;

  const current_page = Number(page ? page : 1);
  const limit = 15;
  console.log(page)  
  const skip = (page - 1) * limit;

  const query = {};

  try {
    if (search) query.name = { $regex: search, $options: "i" };
    if (role) query.rol = role;

    const { users, total } = await userDao.index(skip, limit, query);

    const last_page = Math.ceil(total / limit);

    res.status(200).json({ users, meta: { last_page, current_page, total } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  const data = req.body;

  try {
    const user = await userDao.create(data);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  const pk = req.params.user;
  const data = req.body;

  try {
    const user = await userDao.update(pk, data);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const destroy = async (req, res) => {
  const id = req.params.user;
  try {
    await userDao.destroy(id);

    res.json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

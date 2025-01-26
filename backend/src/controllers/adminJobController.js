import jobDao from "../database/dao/adminJobDao.js";

export const index = async (req, res) => {
  const { is_check, valid, confirm, search, page } = req.query;

  const current_page = Number(page ? page : 1);
  const limit = 15;
  const skip = (page - 1) * limit;
  const query = {};

  if (search) query.description = { $regex: search, $options: "i" };

  if (is_check) {
    query.is_check_enterprise = is_check === "true";
  }

  if (confirm) {
    query.is_check = confirm === "true";
  }

  if (valid === "true") {
    const now = new Date();
    query.$expr = {
      $lt: [
        {
          $dateFromString: {
            dateString: {
              $concat: [
                { $substr: ["$date", 0, 10] },
                "T",
                "$in_time",
                ":00.000Z",
              ],
            },
          },
        },
        now,
      ],
    };
  }

  const { jobs, total } = await jobDao.index(skip, limit, query);

  const last_page = Math.ceil(total / limit);

  res.status(200).json({
    jobs,
    meta: {
      last_page,
      total,
      current_page,
    },
  });
};

export const show = async (req, res) => {
  const params = req.params;

  try {
    const job = await jobDao.show(params.job);

    res.status(200).json({
      job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  const data = req.body;

  try {
    const job = await jobDao.create(data);

    res.status(200).json({
      job,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  const params = req.params;
  try {
    const data = req.body;

    const job = await jobDao.update(params.job, data);

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const destroy = async (req, res) => {
  const { job } = req.params;

  try {
    await jobDao.destroy(job);

    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

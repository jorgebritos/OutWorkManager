import Enterprise from "../Database/Esquemas/Empresa.js";
import slugify from "slugify";

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

    const enterprises = await Enterprise.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    const total = await Enterprise.countDocuments(query);

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
    const enterprise = await Enterprise.findOne({ slug: params.enterprise });

    res.status(200).json({
      enterprise,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  const data = req.body;

  try {
    let enterprise = new Enterprise({
      ...data,
      name: data.name,
      slug: slugify(data.name),
    });

    enterprise = await enterprise.save();

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
    if (req.body.name) {
      var data = { ...req.body, slug: slugify(req.body.name) };
    } else {
      var data = { ...req.body };
    }
    console.log(data)
    const updatedEnterprise = await Enterprise.findOneAndUpdate({ slug: params.enterprise }, data, { new: true });

    res.status(200).json({ enterprise: updatedEnterprise });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const destroy = async (req, res) => {
  const { enterprise } = req.params

  try {
    await Enterprise.findOneAndDelete({ slug: enterprise });

    res.status(200).json({ message: "Empresa eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


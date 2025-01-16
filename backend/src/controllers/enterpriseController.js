import Enterprise from "../Database/Esquemas/Empresa.js";
import slugify from "slugify";

export const index = async (req, res) => {
  const page = Number(req.query.page ? req.query.page: 1);

  const limit = 15;
  const skip = (page - 1) * limit;

  try {
    const enterprises = await Enterprise.find().skip(skip).limit(limit).exec();
    const total = await Enterprise.countDocuments();

    const last_page = Math.ceil(total / limit);

    res.status(200).json({
      enterprises,
      meta: {
        last_page,
        total,
        current_page: page,
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
      name: data.nombre,
      slug: slugify(data.nombre),
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
  const params = req.params

  try {
    const data = {...req.body, slug: slugify(req.body.name)}

    const updatedEnterprise = await Enterprise.findOneAndUpdate(
      { slug: params.enterprise },
      { $set: data },
      { new: true, runValidators: true }
    );

    res.status(200).json({enterprise: updatedEnterprise});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    await Enterprise.findOneAndDelete({slug});

    res.status(200).json({ message: "Empresa eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

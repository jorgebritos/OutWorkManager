import Enterprise from "../Database/Esquemas/Empresa.js";
import slugify from "slugify";

export const index = async (req, res) => {
  const page = req.query.page ? req.query.page : 1;

  const limit = 15;
  const skip = (page - 1) * limit;

  try {
    const enterprises = await Enterprise.find().skip(skip).limit(limit).exec();
    const totalEnterprises = await Enterprise.countDocuments();

    const last_page = Math.ceil(totalEnterprises / limit);

    res.status(200).json({
      enterprises,
      meta: {
        last_page,
        count: totalEnterprises,
        current_page: page,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const show = async (req, res) => {
  let { slug } = req.params;

  try {
    const enterprise = await Enterprise.findOne({ slug });

    if (!enterprise) {
      return res.status(404).json();
    }

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
    const enterpriseData = new Enterprise({
      ...data,
      slug: slugify(data.nombre),
    });

    const enterprise = await enterpriseData.save();

    res.status(200).json({
      enterprise,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const slug = req.params.slug;
    const enterprise = await Enterprise.findOne({ slug });

    if (!enterprise) {
      return res.status(404).json({ message: "La empresa no existe" });
    }

    const data = {...req.body, slug: slugify(req.body.nombre)}

    const updatedEnterprise = await Enterprise.findOneAndUpdate(
      { slug },
      { $set: data },
      { new: true, runValidators: true }
    );

    res.status(201).json(updatedEnterprise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    const slug = req.params.slug;
    const enterprise = await Enterprise.findOne({ slug });

    if (!enterprise) {
      return res.status(404).json({ message: "La empresa no existe" });
    }

    await Enterprise.findOneAndDelete({slug});

    res.status(200).json({ message: "Empresa eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

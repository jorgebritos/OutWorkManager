import Enterprise from "../Database/Esquemas/Empresa.js";

export const enterprise_not_found = async (req, res, next) => {
  const params = req.params;

  try {
    const enterprise = await Enterprise.findOne({ slug: params.enterprise });

    if (!enterprise) {
      return res.status(404).json({ error: "Enterprise not found" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import Operator from "../database/Models/Operator.js";

export const operator_not_found = async (req, res, next) => {
  const params = req.params;

  try {
    const operator = await Operator.findOne({ _id: params.operator });

    if (!operator) {
      return res.status(404).json({ error: "Operator not found" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

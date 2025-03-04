import Enterprise from "../database/Models/Enterprise.js";
import Job from "../database/Models/Job.js";

export const enterprise_job_not_found = async (req, res, next) => {
  const params = req.params;

  try {
    const enterprise = await Enterprise.findOne({ slug: params.enterprise });

    const job = await Job.findOne({
      enterprise_id: enterprise._id,
      _id: params.job
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

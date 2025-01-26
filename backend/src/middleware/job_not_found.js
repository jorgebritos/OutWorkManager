import Job from "../database/Models/Job.js";

export const job_not_found = async (req, res, next) => {
  const params = req.params;

  try {
    const job = await Job.findOne({ _id: params.job });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import Job from "../Models/Job.js";

class enterpriseDao {
  async index(skip, limit, query) {
    const total = await Job.countDocuments(query);
    let jobs = await Job.find(query)
      .populate("enterprise_id")
      .lean()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    jobs = jobs.map((item) => ({
      ...item,
      enterprise_id: undefined,
      enterprise: item.enterprise_id.name,
      date: item.date ? new Date(item.date).toISOString().split("T")[0] : null,
    }));

    return { jobs, total };
  }

  async show(pk) {
    const job = await Job.findOne({ _id: pk }).populate("enterprise_id");

    const jobObject = job.toObject();

    console.log(jobObject.enterprise_id)
    return {
      ...jobObject,
      enterprise: jobObject.enterprise_id.name || null,
      enterprise_id: undefined,
    };
  }

  async create(data) {
    const job = new Job({
      ...data,
    });

    return await job.save();
  }

  async update(job, data) {
    return await Job.findOneAndUpdate(
      { _id: job },
      { $set: { ...data } },
      { new: true, runValidators: true }
    );
  }

  async destroy(job) {
    return await Job.findOneAndDelete({ _id: job });
  }
}

export default new enterpriseDao();

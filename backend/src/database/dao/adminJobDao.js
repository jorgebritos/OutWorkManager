import Job from "../Models/Job.js";

class enterpriseDao {
  async index(skip, limit, query) {
    const total = await Job.countDocuments(query);
    let jobs = await Job.find(query)
      .populate('enterprise_id')
      .lean()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    jobs = jobs.map((item) => ({
      ...item,
      enterprise_id: undefined,
      enterprise: item.enterprise_id.name
    }))

    return { jobs, total };
  }


  async show(job) {
    return await Job.findOne({ _id: job });
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
      { $set: { ...data }},
      { new: true, runValidators: true }
    );
  }

  async destroy(job) {
    return await Job.findOneAndDelete({ _id: job });
  }
}

export default new enterpriseDao();

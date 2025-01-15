import Job from "../Database/Esquemas/Job.js"

export const createJob = async (req, res) => {
    try {
        const jobData = new Job(req.body);
        const savedJob = await jobData.save();
        res.status(200).json(savedJob);
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" });
    }
};

export const addDateToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { date, startTime, endTime, description } = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        job.dates.push({ date, startTime, endTime, description });
        const updatedJob = await job.save();

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" });
    }
};

export const removeDateFromJob = async (req, res) => {
    try {
        const { jobId, dateId } = req.params;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        job.dates = job.dates.filter((date) => date._id.toString() !== dateId);
        const updatedJob = await job.save();

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" });
    }
};

export const updateDateInJob = async (req, res) => {
    try {
        const { jobId, dateId } = req.params;
        const { date, startTime, endTime, description } = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const dateToUpdate = job.dates.id(dateId);
        if (!dateToUpdate) {
            return res.status(404).json({ message: "Date not found" });
        }

        // Actualizar los campos
        dateToUpdate.date = date || dateToUpdate.date;
        dateToUpdate.startTime = startTime || dateToUpdate.startTime;
        dateToUpdate.endTime = endTime || dateToUpdate.endTime;
        dateToUpdate.description = description || dateToUpdate.description;

        const updatedJob = await job.save();

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" });
    }
};

export const getJobs = async (req, res) => {
    try {
        const pagina = 1;
        const limite = 15;
        const saltar = (pagina - 1) * limite;

        const jobs = await Job.find()
            .skip(saltar)
            .limit(limite)
            .populate("enterpriseId", "name") // Only populate the name field from Enterprise
            .exec();

        console.log(jobs)

        const totalJobs = await Job.countDocuments();

        const last_page = Math.ceil(totalJobs / limite);

        res.status(200).json({ jobs, meta: { last_page, current_page: pagina } });
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId).populate("enterpriseId", "name"); // Only populate the name field from Enterprise
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" });
    }
};

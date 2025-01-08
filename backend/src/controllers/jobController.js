import { Job } from "../Database/Esquemas/Job.js"
// Controladores
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
        const jobs = await Job.find().populate("enterpriseId");
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId).populate("enterpriseId");
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" });
    }
};

import { Job } from '../Base_De_Datos/Esquemas/job.js'; // Asumiendo que tienes estos modelos
import { JobDate } from '../Base_De_Datos/Esquemas/jobDates.js';
import { Document } from '../Base_De_Datos/Esquemas/document.js';
import { RequestedDocument } from '../Base_De_Datos/Esquemas/requestedDocument.js';
    



// Mostrar todos los trabajos
const index = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            include: [{
                model: JobDate,
                attributes: ['job_id', 'fecha', 'hora_entrada', 'hora_salida']
            }]
        });

        const job_dates = jobs.flatMap(job => job.jobdates.map(jobDate => ({
            job_id: jobDate.job_id,
            fecha: jobDate.fecha,
            hora_entrada: jobDate.hora_entrada,
            hora_salida: jobDate.hora_salida
        })));

        return res.json({
            jobs,
            job_dates
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// Mostrar un trabajo específico
const show = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id, {
            include: ['fechas', 'documentos'] // Asegúrate de que las relaciones estén bien definidas
        });

        if (!job) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        return res.json(job);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo trabajo
const store = async (req, res) => {
    const { trabajo, enterprise_id, fechas, documentos } = req.body;

    try {
        // Crear el trabajo
        const job = await Job.create({
            trabajo,
            enterprise_id,
            confirmacion_prevencionista: null,
            confirmacion_empresa: null
        });

        // Crear las fechas asociadas al trabajo
        for (const fecha of fechas) {
            await JobDate.create({
                fecha: fecha.fechaInicio,
                hora_entrada: fecha.timeE,
                hora_salida: fecha.timeS,
                job_id: job.id
            });
        }

        // Crear los documentos si existen
        if (documentos) {
            for (const doc of documentos) {
                if (doc.url) {
                    // Crear documentos con archivo
                    await Document.create({
                        title: doc.titulo,
                        url_document: doc.url, // Aquí deberías procesar la subida del archivo
                        job_id: job.id,
                        is_valid: doc.valido || false,
                        expire: doc.dataTang || null
                    });
                } else {
                    // Crear documentos sin archivo
                    await RequestedDocument.create({
                        title: doc.titulo,
                        job_id: job.id,
                        enterprise_id
                    });
                }
            }
        }

        return res.status(201).json({ message: 'Trabajo creado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// Actualizar el trabajo
const update = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        job.confirmacion_prevencionista = req.body.confirmacion_prevencionista;
        await job.save();

        // Emitir el evento JobUpdated
        JobUpdated(job);

        return res.json({ message: 'Trabajo actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// Actualizar la confirmación
const updateConfirmation = async (req, res) => {
    try {
        const { confirmacion_prevencionista } = req.body;

        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Trabajo no encontrado' });
        }

        job.confirmacion_prevencionista = confirmacion_prevencionista;
        await job.save();

        // Emitir el evento JobUpdateEvent
        JobUpdateEvent(job);

        return res.json({ message: 'Confirmación actualizada correctamente', job });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// Eliminar el trabajo
const destroy = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        // Eliminar las fechas asociadas
        await JobDate.destroy({ where: { job_id: job.id } });
        await job.destroy();

        return res.json({ message: 'Trabajo eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export {
    show,
    index,
    updateConfirmation,
    destroy,
    update,
    store
}
import Enterprise from "../../Base_De_Datos/Esquemas/Empresas.js"

export const create = async (req, res) => {
    try {
        const enterpriseData = new Enterprise(req.body);
        const { rut } = enterpriseData;
        const enterpriseExist = await Enterprise.findOne({ rut });

        if (enterpriseExist) {
            return res.status(400).json({ message: "La empresa ya existe" });
        }

        const savedEnterprise = await enterpriseData.save();
        res.status(200).json(savedEnterprise)
    } catch (error) {
        res.status(500).jso({ error: "Internal Network Error" })
    }
}

export const fetch = async (req, res) => {
    try {
        const enterprises = await Enterprise.find();

        res.status(200).json(enterprises);
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const enterpriseExist = await Enterprise.findOne({ _id: id });

        if (!enterpriseExist) {
            return res.status(404).json({ message: "La empresa no existe" });
        }

        const updateEnterprise = await Enterprise.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateEnterprise)
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" })
    }
}

export const deleteEnterprise = async (req, res) => {
    try {
        const id = req.params.id;
        const enterpriseExist = await Enterprise.findOne({ _id: id });

        if (!enterpriseExist) {
            return res.status(404).json({ message: "La empresa no existe" });
        }

        await Enterprise.findOneAndDelete(id);

        res.status(201).json({ message: "Empresa eliminada con éxito" })

    } catch (error) {

        res.status(500).json({ error: "Internal Network Error" })

    }
}
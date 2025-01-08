import Enterprise from "../Database/Esquemas/Empresas.js"

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
    const pagina = 1, limite = 1
    try {
        const saltar = (pagina - 1) * limite;

        const enterprises = await Enterprise.find()
            .skip(saltar) // Saltar los primeros productos
            .limit(limite) // Limitar la cantidad de productos por página
            .exec();
        console.log(enterprises)
        const totalEnterprises = await Enterprise.countDocuments();

        // Calcular el número de la última página
        const last_page = Math.ceil(totalEnterprises / limite);

        res.status(200).json({
            enterprises,
            meta: {
                last_page,
                current_page: pagina
            },
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return { error: 'No se pudieron obtener los productos' };
    }
};

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
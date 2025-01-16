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
        const pagina = 1, limite = 15
        const saltar = (pagina - 1) * limite;

        const enterprises = await Enterprise.find()
            .skip(saltar) // Saltar los primeros productos
            .limit(limite) // Limitar la cantidad de productos por página
            .exec();
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
        res.status(500).json({ error: "Internal Network Error" })
    }
}

export const fetch = async (req, res) => {
    let { slug } = req.params;

    if (slug) {
        try {
            const enterprise = await Enterprise.findOne({ slug });
            if (!enterprise) {
                return res.status(404).json({ message: "La empresa no existe" });
            }
            let pagina = 1, limite = 15
            let saltar = (pagina - 1) * limite;
            let totalDocuments = enterprise.documentos.length
            let totalOperators = enterprise.operadores.length
            let last_page_documents = Math.ceil(totalDocuments / limite);
            let last_page_operators = Math.ceil(totalOperators / limite);
            return res.status(200).json({
                enterprise,
                operators: {
                    operators: [...enterprise.operadores],
                    meta: {
                        last_page: last_page_operators,
                        current_page: pagina
                    }
                },
                documents: {
                    documents: [...enterprise.documentos],
                    meta: {
                        last_page: last_page_documents,
                        current_page: pagina
                    }
                }
            });
        } catch (error) {
            res.status(500).json({ error: "Internal Network Error" })
        }
    }
    const pagina = 1, limite = 15
    try {
        const saltar = (pagina - 1) * limite;

        const enterprises = await Enterprise.find()
            .skip(saltar) // Saltar los primeros productos
            .limit(limite) // Limitar la cantidad de productos por página
            .exec();
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
        const slug = req.params.slug;
        const enterpriseExist = await Enterprise.findOne({ slug: slug });
        
        if (!enterpriseExist) {
            return res.status(404).json({ message: "La empresa no existe" });
        }
        enterpriseExist.operadores.push(req.body)
        const updateEnterprise = await Enterprise.findOneAndUpdate({slug}, enterpriseExist, { new: true });
        res.status(201).json(updateEnterprise)
    } catch (error) {
        res.status(500).json({ error: "Internal Network Error" })
    }
}

export const deleteEnterprise = async (req, res) => {
    try {
        const id = req.params.id;
        const enterpriseExist = await Enterprise.findOne({ slug: id });

        if (!enterpriseExist) {
            return res.status(404).json({ message: "La empresa no existe" });
        }

        await Enterprise.findOneAndDelete(id);

        res.status(201).json({ message: "Empresa eliminada con éxito" })

    } catch (error) {

        res.status(500).json({ error: "Internal Network Error" })

    }
}
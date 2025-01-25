import Operator from "../Database/Esquemas/Operator.js"
import Enterprise from "../Database/Esquemas/Empresa.js"
export const fetch = async (req, res) => {
    const { filter, search, page } = req.query;

    const current_page = Number(page ? page : 1);
    const limit = 15;
    const skip = (page - 1) * limit;
    try {
        const query = {};
        if (filter !== undefined && filter !== null) {
            query.is_valid = filter === "true";
        }

        if (search) query.name = { $regex: search, $options: "i" };

        const operators = await Operator.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .exec();

        const total = await Operator.countDocuments(query);

        const last_page = Math.ceil(total / limit);
        console.log(current_page)
        res.status(200).json({
            operators,
            meta: {
                last_page,
                total,
                current_page,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const show = async (req, res) => {
    const params = req.params;

    try {
        const enterprise = await Enterprise.findOne({ slug: params.slug });
        console.log(enterprise._id)
        res.status(200).json({
            enterprise,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const create = async (req, res) => {
    const data = req.body;
    try {

        const enterprise = await Enterprise.findOne({ slug: req.params.slug });

        let operator = new Operator({
            ...data,
            enterprise_id: enterprise._id,
        });
        operator = await operator.save();

        console.log("asdjaosnds")
        res.status(200).json({
            operator,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    const params = req.params;
    try {
        if (req.body.name) {
            var data = { ...req.body, slug: slugify(req.body.name) };
        } else {
            var data = { ...req.body };
        }
        console.log(data)
        const updatedEnterprise = await Enterprise.findOneAndUpdate({ slug: params.enterprise }, data, { new: true });

        res.status(200).json({ enterprise: updatedEnterprise });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOperator = async (req, res) => {

    try {
        let ci = req.params.id
        console.log(req.params)
        await Operator.findOneAndDelete({ ci: ci });
        console.log("aszsasd")
        res.status(200).json({ message: "Operador eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


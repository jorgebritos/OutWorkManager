import User from "../Database/Esquemas/Usuario.js"

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { correo } = userData;
        const userExist = await User.findOne({ correo })

        if (userExist) {
            return res.status(400).json({ message: "User already exists." });
        }

        const savedUser = await userData.save();
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(500).json({ error: "Internal Network error" })
    }
}

export const fetch = async (req, res) => {
    try {
        const pagina = 1;
        const limite = 15;
        const saltar = (pagina - 1) * limite;

        const users = await User.find()
            .skip(saltar)
            .limit(limite)
            .exec();

        const totalUsers = await User.countDocuments();

        const last_page = Math.ceil(totalUsers / limite);

        res.status(200).json({ users, meta: { last_page, current_page: pagina } });
    } catch (error) {
        res.status(500).json({ error: "Internal Network error" })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });

        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateUser)
    } catch (error) {
        res.status(500).json({ error: "Internal Network error" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById({ _id: id });

        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findOneAndDelete(id);

        res.status(201).json({ message: "User deleted successfully." });

    } catch (error) {

        res.status(500).json({ error: "Internal Network error" })

    }
}

import User from "../database/Models/User.js"

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { email } = userData;
        const userExist = await User.findOne({ email })


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
    const { role, search, page } = req.query
    try {
        const current_page = Number(page ? page : 1);
        const limit = 15;
        const skip = (page - 1) * limit;
        const query = {};
        if (role !== undefined && role !== null) {
            query.rol = role
        }

        if (search) query.name = { $regex: search, $options: "i" };

        const users = await User.find(query)
            .skip(skip)
            .limit(limit)
            .exec();


        const totalUsers = await User.countDocuments();

        const last_page = Math.ceil(totalUsers / limit);

        res.status(200).json({ users, meta: { last_page, current_page } });
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
        const userExist = await User.findOne({ _id: id });

        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.findOneAndDelete({ _id: id });

        res.status(201).json({ message: "User deleted successfully." });

    } catch (error) {

        res.status(500).json({ error: "Internal Network error" })

    }
}

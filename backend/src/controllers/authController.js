import User from "../Database/Esquemas/Usuarios.js"

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ correo: req.body.email });
        const data = { user: user }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Network error" })
    }
}
import User from "../Database/Esquemas/Usuario.js";
import Enterprise from "../Database/Esquemas/Empresa.js";
import { generate_token } from "../utils/generate_token.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const enterprise = await Enterprise.find({ user: user.id }).populate("user");

  const authorization = await user.compare_password(password);

  if (!authorization) {
    return res.status(400).json({
      password: "Invalid password",
    });
  }

  const access_token = generate_token(user);

  res.json({
    access_token,
    user: {
      email: user.email,
      id: user.id,
      image: user.image,
      name: user.name,
      rol: user.rol,
    },
    enterprise: enterprise.length === 0 ? null : enterprise[0],
    message: "OK",
  });
};

export const register = (req, res) => {
  const data = req.body;

  const user = new User({
    ...data,
    rol: "Enterprise",
  });

  user.save();

  res.status(201).json({ message: "OK" });
};

import { mongoose } from "mongoose";
import dotenv from "dotenv";

const bd = async () => {
  dotenv.config();
  await mongoose
    .connect(process.env.DB_URL)
    .catch((err) => {
      console.error("Error de conexion:", err);
    });
};

export default bd;


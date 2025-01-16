import { mongoose } from "mongoose";
import dotenv from "dotenv";

const connect = async () => {
  dotenv.config();
  await mongoose
    .connect(process.env.DB_URL)
    .catch((err) => {
      console.error("Error de conexion:", err);
    });
};

export const closeConnect = async (callback) => {
  try {
    await mongoose.connection.close();
    callback()
  } catch (err) {
    console.error("Error al cerrar la conexión:", err);
  }
};

export default connect;


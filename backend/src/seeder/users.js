import { faker } from "@faker-js/faker";
import User from "../Database/Esquemas/Usuario.js";

//const data = {
//name: faker.name.findName(),
//email: faker.internet.email(),
//password: faker.internet.password(),
//};

export const generate_user = async () => {
  console.log('Created Users')
  const admin = new User({
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    rol: "Admin",
  });

  await admin.save();

  const guard = new User({
    name: "guardia",
    email: "guardia@gmail.com",
    password: "guardia",
    rol: "Guard",
  });

  await guard.save();

  const enterprise = new User({
    name: "empresa",
    email: "empresa@gmail.com",
    password: "empresa",
    rol: "Enterprise",
  });

  await enterprise.save();
  console.log('Done')
  //for (let i = 0; i <= 30; i++) {
  // TOOD: usuarios aleatorios
  //}
};

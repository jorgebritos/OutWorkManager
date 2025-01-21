import { faker } from "@faker-js/faker";
import User from "../database/Models/User.js";

export const generate_user = async () => {
  console.log("Creating Users...");
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
  for (let i = 0; i <= 10; i++) {
    const data = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const user = new User({ ...data, rol: "Enterprise" });

    await user.save();
  }

  console.log("Done");
};

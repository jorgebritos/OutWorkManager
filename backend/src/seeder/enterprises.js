import { faker } from "@faker-js/faker";
import Empresa from "../Database/Esquemas/Empresa.js";
import slugify from "slugify";

export const generate_enterprise = async () => {
  console.log('Created Enterprises')
  for (let i = 0; i <= 30; i++) {
    let name = faker.person.fullName();
    const data = {
      nombre: name,
      slug: slugify(name, { lower: true, strict: true }),
      is_valid: faker.datatype.boolean(),
      image: null,
      user_id: null
    };

    const empresa = new Empresa(data);

    await empresa.save();
  }
  console.log('Done')
};

import { faker } from "@faker-js/faker";
import Enterprise from "../Database/Esquemas/Empresa.js";
import Document from "../Database/Esquemas/Document.js";
import slugify from "slugify";

export const generate_enterprise = async () => {
  console.log("Creating Enterprises...");
  for (let i = 1; i <= 30; i++) {
    let name = faker.person.fullName();
    const data = {
      name: name,
      slug: slugify(name, { lower: true, strict: true }),
      is_valid: faker.datatype.boolean(),
      image: null,
      user_id: null,
    };

    const enterprise = new Enterprise(data);

    await enterprise.save();
    for (let i = 1; i <= 15; i++) {
      const startDate = new Date("2023-01-01");
      const endDate = new Date("2024-12-31");

      const randomDate = faker.date.between({ from: startDate, to: endDate });
      const data_document = {
        url_document: 'no ahi documento',
        title: faker.person.fullName(),
        expire: randomDate,
        type: null,
        is_valid: faker.datatype.boolean(),
        enterprise_id: enterprise._id,
      };

      const document = new Document(data_document);

      await document.save();
    }
  }
  console.log(`Done`);
};

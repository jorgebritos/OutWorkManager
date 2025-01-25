import { faker } from "@faker-js/faker";
import Enterprise from "../database/Models/Enterprise.js";
import Document from "../database/Models/Document.js";
import Operator from "../database/Models/Operator.js";
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
        url_document: "no ahi documento",
        title: faker.person.fullName(),
        expire: randomDate,
        type: null,
        is_valid: faker.datatype.boolean(),
        enterprise_id: enterprise._id,
      };

      const document = new Document(data_document);

      await document.save();
    }

    for (let i = 1; i <= 15; i++) {
      const data_operator = {
        ci: 12345,
        name: faker.person.fullName(),
        authorized: faker.datatype.boolean(),
        role_description: faker.lorem.sentence(),
        enterprise_id: enterprise._id,
      };

      const operator = new Operator(data_operator);

      await operator.save();

      for (let i = 1; i <= 15; i++) {
        const startDate = new Date("2023-01-01");
        const endDate = new Date("2024-12-31");

        const randomDate = faker.date.between({ from: startDate, to: endDate });
        const data_document_operator = {
          url_document: "no ahi documento",
          title: faker.person.fullName(),
          expire: randomDate,
          type: null,
          is_valid: faker.datatype.boolean(),
          operator_id: operator._id,
        };

        const document = new Document(data_document_operator);

        await document.save();
      }
    }
  }
  console.log(`Done`);
};

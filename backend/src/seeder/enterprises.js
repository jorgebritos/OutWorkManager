import { faker } from "@faker-js/faker";
import Enterprise from "../database/Models/Enterprise.js";
import Document from "../database/Models/Document.js";
import User from "../database/Models/User.js";
import Operator from "../database/Models/Operator.js";
import slugify from "slugify";
import Job from "../database/Models/Job.js";

const generate_user = async () => {
  const data = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const user = new User({ ...data, rol: "Enterprise" });

  return await user.save();
};

export const generate_enterprise = async () => {
  console.log("Creating Enterprises...");
  for (let i = 1; i <= 30; i++) {
    let name = faker.person.fullName();

    let user = null;
    if (faker.datatype.boolean()) {
      user = await generate_user();
    }

    const data = {
      name: name,
      slug: slugify(name, { lower: true, strict: true }),
      is_valid: faker.datatype.boolean(),
      image: null,
      user_id: user ? user.id : null,
    };

    const enterprise = new Enterprise(data);

    await enterprise.save();
    for (let i = 1; i <= 15; i++) {
      const startDate = new Date("2023-01-01");
      const endDate = new Date("2024-12-31");

      const randomDate = faker.date.between({ from: startDate, to: endDate });
      const data_document = {
        url_document: "no hay documento",
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
          url_document: "no hay documento",
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
    for (let i = 1; i <= 1; i++) {
      const startDate = new Date("2022-01-01");
      const endDate = new Date("2026-12-31");

      const randomDate = faker.date.between({ from: startDate, to: endDate });

      const data_job = {
        description: faker.lorem.sentence(),
        is_check: faker.datatype.boolean(),
        is_check_enterprise: faker.datatype.boolean(),
        date: randomDate,
        in_time: "12:23",
        in_time_confirm: faker.datatype.boolean(),
        out_time: "14:24",
        out_time_confirm: faker.datatype.boolean(),
        enterprise_id: enterprise._id,
      };

      const job = new Job(data_job);

      await job.save();
    }
  }
  console.log("Create documents success");
  console.log("Create users success");
  console.log("Create operators success");
  console.log("Create documents form operators success");
  console.log("Create jobs success");
  console.log(`Done`);
};

import slugify from "slugify";
import { faker } from "@faker-js/faker";
import User from "../database/Models/User.js";
import Enterprise from "../database/Models/Enterprise.js";
import Job from "../database/Models/Job.js";
import Operator from "../database/Models/Operator.js";
import Document from "../database/Models/Document.js";

function getRandomDate() {
  const startDate = new Date(2000, 0, 1);
  const endDate = new Date(2026, 11, 31);

  const randomDate = faker.date.between({ from: startDate, to: endDate });

  return formatDateTime(randomDate);
}

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}



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

  const enterpriseman = new User({
    name: "empresa",
    email: "empresa@gmail.com",
    password: "empresa",
    rol: "Enterprise",
  });

  await enterpriseman.save();

  const name = faker.person.fullName();

  const enterprise = new Enterprise({
    name: name,
    slug: slugify(name, { lower: true, strict: true }),
    is_valid: faker.datatype.boolean(),
    image: null,
    user_id: enterpriseman._id,
  });

  enterprise.save();

  for (let i = 1; i <= 15; i++) {
    const data_document = {
      url_document: "no hay documento",
      title: faker.person.fullName(),
      expire: getRandomDate(),
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
      const data_document_operator = {
        url_document: "no hay documento",
        title: faker.person.fullName(),
        expire: getRandomDate(),
        type: null,
        is_valid: faker.datatype.boolean(),
        operator_id: operator._id,
      };

      const document = new Document(data_document_operator);

      await document.save();
    }
  }
  for (let i = 1; i <= 20; i++) {
    const data_job = {
      description: faker.lorem.sentence(),
      is_check: faker.datatype.boolean(),
      is_check_enterprise: faker.datatype.boolean(),
      in_datetime: getRandomDate(),
      in_datetime_confirm: null,
      out_datetime: getRandomDate(),
      out_datetime_confirm: null,
      enterprise_id: enterprise._id,
    };

    const job = new Job(data_job);

    await job.save();

    for (let i = 1; i <= 15; i++) {
      const data_document_job = {
        url_document: "no hay documento",
        title: faker.person.fullName(),
        expire: getRandomDate(),
        type: null,
        is_valid: faker.datatype.boolean(),
        job_id: job._id,
      };

      const document = new Document(data_document_job);

      await document.save();
    }
  }

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

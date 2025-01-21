import connect, { closeConnect } from "../config/bd.js";

import { faker } from "@faker-js/faker";
connect();

import { generate_user } from "./users.js";
import { generate_enterprise } from "./enterprises.js";

(async () => {
  await generate_user();
  await generate_enterprise();

  await closeConnect(() => {
    console.log("finished successfully")
  })
})();


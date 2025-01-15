import connect from "../config/bd.js";

connect();

import { generate_user } from "./users.js";
import { generate_enterprise } from "./enterprises.js";

(async () => {
  await generate_user();
  await generate_enterprise();
})();

console.log("created successfully");

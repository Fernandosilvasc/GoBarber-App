import { createConnection } from "typeorm";

createConnection().then(() =>
console.log('🗃  Successfully connected with database on port:5432'),);

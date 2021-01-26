import { createConnections } from 'typeorm';

createConnections().then(() =>
  console.log(
    '⚙️  Successfully connected with postgresDB on port:5432 and mongoDB on port:27017',
  ),
);

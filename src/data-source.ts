import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/*{.js,.ts}"],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;

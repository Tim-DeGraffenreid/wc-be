import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/*{.js,.ts}"],
  migrations: [],
  subscribers: [],
});

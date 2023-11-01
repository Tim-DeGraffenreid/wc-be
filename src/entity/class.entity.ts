import { Column, Entity } from "typeorm";
import Model from "./base.entity";

Entity("class");
export class Classes extends Model {
  @Column({ unique: true })
  name: string;
}

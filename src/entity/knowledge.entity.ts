import { Column, Entity, ManyToOne } from "typeorm";
import { Student } from "./students.entity";
import Model from "./base.entity";
import { Classes } from "./class.entity";

@Entity()
export class Knowledge extends Model {
  @ManyToOne(() => Student)
  student: Student;

  @Column({ nullable: true })
  grade: string;

  @ManyToOne(() => Classes)
  class: Classes;

  @Column({ nullable: true })
  skills: string;
}

import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Parent } from "./parents.entity";
import { Knowledge } from "./knowledge.entity";
import Model from "./base.entity";
import bcrypt from "bcrypt";

export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
}

@Entity()
export class Student extends Model {
  @ManyToOne(() => Parent, { onDelete: "CASCADE" })
  parent: Parent;

  @Index("student_email_index")
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fName: string;

  @Column()
  lName: string;

  @Column()
  phoneNumber: string;

  @Column("date")
  birthday: Date;

  @Column()
  grade: string;

  @Column()
  schoolName: string;

  @Column({ type: "enum", enum: GenderEnum })
  gender: string;

  @Column()
  zipCode: string;

  // TODO: add username column
  // TODO: forgot password functionality

  @OneToMany(() => Knowledge, (knowledge) => knowledge.student, {
    cascade: true,
    eager: true,
  })
  knowledge: Knowledge[];

  toJSON() {
    return { ...this, password: undefined };
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @BeforeInsert()
  handleBirthDate() {
    this.birthday = new Date(this.birthday);
  }

  // ? Validate password
  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

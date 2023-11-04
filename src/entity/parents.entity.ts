import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Student } from "./students.entity";
import { DemographicInfo } from "./demographic.entity";
import Model from "./base.entity";
import bcrypt from "bcrypt";

@Entity()
export class Parent extends Model {
  @Column({ unique: true })
  @Index("parent_email_index")
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
  educationLevel: string;

  @Column()
  veteranStatus: string;

  @Column()
  regularTransportation: boolean;

  @Column()
  housingStatus: string;

  @OneToMany(() => Student, (student) => student.parent)
  children: Student[];

  @JoinColumn()
  @OneToOne(() => DemographicInfo)
  demographicInfo: DemographicInfo;

  toJSON() {
    return { ...this, password: undefined };
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @BeforeInsert()
  convertDate() {
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

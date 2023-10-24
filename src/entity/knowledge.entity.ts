import { Column, Entity, ManyToOne } from 'typeorm'
import { Student } from './students.entity'
import Model from './base.entity'

@Entity()
export class Knowledge extends Model {
  @ManyToOne(() => Student)
  student: Student

  @Column()
  grade: string

  @Column()
  language: string

  @Column()
  skills: string
}
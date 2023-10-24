import { Column, Entity, OneToOne } from 'typeorm'
import { Parent } from './parents.entity'
import Model from './base.entity'

@Entity()
export class DemographicInfo extends Model {
  @OneToOne(() => Parent)
  parent: Parent

  @Column()
  zipCode: string

  @Column()
  address: string

  @Column()
  foodStampEligible: boolean

  @Column()
  ethnicity: string

  @Column()
  householdIncome: string

  @Column()
  disclaimerAccepted: string
}

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import argon2 from 'argon2'
import { Exclude, Expose } from 'class-transformer'

@Expose()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
    id: string

  @Column()
    name: string

  @Column({
    unique: true
  })
    email: string

  @Column()
  @Exclude()
    password: string

  @CreateDateColumn() createdAt: Date

  @BeforeInsert()
  async hashPassword () {
    this.password = await argon2.hash(this.password)
  }

  async comparePassword (attemptPassword: string) {
    return await argon2.verify(this.password, attemptPassword)
  }
}

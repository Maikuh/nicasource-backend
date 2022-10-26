import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import argon2 from 'argon2'
import { Exclude } from 'class-transformer'
import { Video } from './Video.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({
    unique: true,
  })
  email: string

  @Column()
  @Exclude()
  password: string

  @OneToMany(
    () => Video,
    video => video.creator
  )
  videos: Video[]

  @JoinTable({ name: 'likes' })
  @ManyToMany(
    () => Video,
    video => video.likedBy,
    { cascade: true }
  )
  likes: Video[]

  @CreateDateColumn() createdAt: Date

  @BeforeInsert()
  async hashPassword () {
    this.password = await argon2.hash(this.password)
  }

  async comparePassword (attemptPassword: string) {
    return await argon2.verify(this.password, attemptPassword)
  }
}

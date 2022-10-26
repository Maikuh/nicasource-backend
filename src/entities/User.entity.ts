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
import { IsUrl } from 'class-validator'
import { UserRole } from '../enums/user-role.enum'

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

  @Column({ enum: UserRole, type: 'enum' })
  role: UserRole

  @Column()
  @Exclude()
  password: string

  @Column()
  @IsUrl()
  photoUrl: string

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

  @JoinTable({
    name: 'follows',
    joinColumn: { name: 'creator_id' },
    inverseJoinColumn: { name: 'follower_id' },
  })
  @ManyToMany(
    () => User,
    user => user.followers,
    { cascade: true }
  )
  following: User[]

  @ManyToMany(
    () => User,
    user => user.following
  )
  followers: User[]

  @CreateDateColumn() createdAt: Date

  @BeforeInsert()
  async hashPassword () {
    this.password = await argon2.hash(this.password)
  }

  async comparePassword (attemptPassword: string) {
    return await argon2.verify(this.password, attemptPassword)
  }
}

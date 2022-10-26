import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsBoolean, IsUrl } from 'class-validator'
import { User } from './User.entity'

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  @IsBoolean()
  published: boolean = false

  @Column()
  @IsUrl()
  srcUrl: string

  @ManyToOne(
    () => User,
    user => user.videos
  )
  creator: User

  @ManyToMany(() => User, user => user.likes)
  likedBy: User[]

  @CreateDateColumn() createdAt: Date
  @UpdateDateColumn() updatedAt: Date
}

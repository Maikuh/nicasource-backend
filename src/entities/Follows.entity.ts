import {
  AfterInsert,
  BeforeRemove,
  Entity,
  PrimaryColumn,
} from 'typeorm'
import { logger } from '../logger'

@Entity()
export default class Follows {
  @PrimaryColumn({ type: 'uuid' })
  creator_id: string

  @PrimaryColumn({ type: 'uuid' })
  follower_id: string

  @AfterInsert()
  private followNotification () {
    logger.info(`User "${this.follower_id}" has followed "${this.creator_id}"!`)
  }

  @BeforeRemove()
  private unfollowNotification () {
    logger.info(`User "${this.follower_id}" has unfollowed "${this.creator_id}" :(`)
  }
}

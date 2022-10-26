import {
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator'
import { User } from '../entities/User.entity'

export class UpdateVideoDTO {
  @IsString()
  @MinLength(4)
  title: string

  @IsUrl()
  srcUrl: string

  creator?: User
}

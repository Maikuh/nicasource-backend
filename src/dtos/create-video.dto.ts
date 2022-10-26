import { IsBoolean, IsOptional } from 'class-validator'
import { UpdateVideoDTO } from './update-video.dto'

export class CreateVideoDTO extends UpdateVideoDTO {
  @IsBoolean()
  @IsOptional()
  published = false
}

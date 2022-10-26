import { IsBoolean } from 'class-validator'

export class VideoPubUnpubDTO {
  @IsBoolean()
  published: boolean
}

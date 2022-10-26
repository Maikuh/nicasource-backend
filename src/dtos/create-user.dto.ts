import { Length, IsEmail, IsUrl, IsEnum } from 'class-validator'
import { UserRole } from '../enums/user-role.enum'

export class CreateUserDTO {
  @Length(4)
  name: string

  @IsEmail()
  email: string

  @Length(8)
  password: string

  @IsUrl()
  photoUrl: string

  @IsEnum(UserRole)
  role: UserRole
}

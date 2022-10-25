import { Length, IsEmail } from 'class-validator'

export class CreateUserDTO {
  @Length(4)
  name: string

  @IsEmail()
  email: string

  @Length(8)
  password: string
}

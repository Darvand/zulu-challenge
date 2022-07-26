import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterClientDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly document_id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly address: string;
}

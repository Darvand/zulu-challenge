import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterClientDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'The client email', example: 'example@email.com' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Password that will be used in login activities', example: 'verydificultp4ssw0rd' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ description: 'The client full name', example: 'Darvand Frovonwill' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ description: 'National id document', example: '10204059302' })
  readonly document_id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Client address', example: 'Kra 24 # 24 - 32 ' })
  readonly address: string;
}

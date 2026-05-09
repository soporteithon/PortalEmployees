import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
    
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    rol?: string;

    @IsBoolean()
    @IsOptional()
    activo?: boolean;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @IsOptional()
    password?: string;
}

import { IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsNumber()
    codEmpleado: number;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    email: string;

    @IsString()
    @IsOptional()
    rol?: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        { message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número' }
    )
    password: string;

}
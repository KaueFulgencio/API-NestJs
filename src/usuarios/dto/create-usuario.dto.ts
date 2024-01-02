import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres' })
  senha: string;

  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  email: string;
}

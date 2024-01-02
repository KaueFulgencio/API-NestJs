import { Column } from 'typeorm';

export class CreateUsuarioDto {
  nome: string;
  senha: string;
  email: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  dataUltimoAcesso: Date;
}

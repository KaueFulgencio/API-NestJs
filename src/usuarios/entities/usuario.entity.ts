import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column()
  email: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dataAtualizacao: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dataUltimoAcesso: Date;
}

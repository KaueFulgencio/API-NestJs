import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    readonly nome?: string;
    readonly senha?: string;
    readonly email?: string;
    readonly dataCriacao?: Date;
    readonly dataAtualizacao?: Date;
    readonly dataUltimoAcesso?: Date;
}

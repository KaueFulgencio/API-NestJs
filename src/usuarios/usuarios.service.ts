import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { FindOneOptions , UpdateResult} from 'typeorm';

@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(Usuario) 
  private readonly usuarioRepository: Repository<Usuario>){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const newUser = await this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(newUser);
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}

export function responseHandler(status, statusMsg) {
  return {
    success: status,
    payload: statusMsg,
  };
}
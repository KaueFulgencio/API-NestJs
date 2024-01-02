import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { email } = createUsuarioDto;
    const existingUser = await this.usuarioRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const newUser = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(newUser);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const findOptions: FindOneOptions = { where: { id } };

    const user = await this.usuarioRepository.findOne(findOptions);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const updateUser = await this.findOne(id);
    Object.assign(updateUser, updateUsuarioDto);
    return await this.usuarioRepository.save(updateUser);
  }

  async remove(id: number): Promise<boolean> {
    const userToRemove = await this.findOne(id);
    if (userToRemove) {
      await this.usuarioRepository.remove(userToRemove);
      return true;
    }
    return false;
  }
}

export function responseHandler(status, statusMsg) {
  return {
    success: status,
    payload: statusMsg,
  };
}

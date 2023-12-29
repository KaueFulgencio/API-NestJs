import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { FindOneOptions, Repository , UpdateResult} from 'typeorm';

@Injectable()
export class TodosService {
  
  constructor(@InjectRepository(Todo) 
  private readonly todoRepository: Repository<Todo>){}

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = await this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(newTodo);
  }

  async findAll(): Promise<Todo[]> {
    const allTodos = await this.todoRepository.find()
    
    return allTodos;
  }

  async findOne(id: number) {
    const findOptions: FindOneOptions = { where: { id } };

    const findOneTodo = await this.todoRepository.findOne(findOptions);
  
    if (!findOneTodo ) {
      throw new NotFoundException('Todo not found');
    }
  
    return findOneTodo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const findOptions: FindOneOptions = { where: { id } };
    const todo = await this.todoRepository.findOne(findOptions);
  
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
  
    await this.todoRepository.update(id, updateTodoDto);
    const updatedTodo = await this.todoRepository.findOne(findOptions);
  
    return updatedTodo;
  }
  

  async remove(id: number): Promise<any> {
    const options: FindOneOptions = { where: { id } };
  
    const deletedItem = await this.todoRepository.findOne(options);

    if (!deletedItem) {
      throw new NotFoundException('Item não encontrado');
    }
  
    const deleted = await this.todoRepository.delete(id);
      if (deleted) {
        return {
          status: HttpStatus.OK,
          body: { message: 'Item deletado com sucesso' }
        };
      } else {
        throw new Error('Impossivel deletar este item');
      }
    }
}

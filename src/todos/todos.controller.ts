import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todos = await this.findOne(id);
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const todos = await this.findOne(id);
    return this.todosService.remove(+id), console.log(todos);
  }
}

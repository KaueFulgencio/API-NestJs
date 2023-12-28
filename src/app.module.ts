import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';
import path, { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'kaue',
      password: '',
      database: 'api',
      //entities: [User, Todo], 
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

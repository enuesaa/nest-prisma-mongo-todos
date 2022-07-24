import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { TodosService } from './todos.service'
import { ObjectId } from 'bson'

type GetTodoInput = {
  readonly id: string;
};
type CreateTodoInput = Readonly<Omit<Prisma.TodoCreateInput, 'id'>>;

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  list(): Array<{}> {
    return []
  }

  @Get(':id')
  async view(@Param() params: GetTodoInput): Promise<Todo> {
    return await this.todoService.findById(params);
  }

  @Post()
  async add(@Body() input: CreateTodoInput): Promise<Todo> {
    const data = {id: (new ObjectId()).toString(), name: 'aaa', description: 'bbb'}
    return await this.todoService.save(data);
  }

  @Put(':id')
  edit(@Param() params): {} {
    return {}
  }

  @Delete(':id')
  delete(@Param() params): {} {
    return {}
  }
}

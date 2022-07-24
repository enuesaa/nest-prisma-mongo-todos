import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { TodosService } from '@/todos/todos.service'
import { ObjectId } from 'bson'

type GetTodoInput = {
  readonly id: string;
};
type CreateTodoInput = Readonly<Omit<Prisma.TodoCreateInput, 'id'>>;

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  async list(): Promise<Todo[]> {
    return await this.todoService.find();
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
  async edit(@Param() params: GetTodoInput, @Body() input: CreateTodoInput): Promise<Todo | {}> {
    const data = {name: 'aa', description: 'bbb'}
    return await this.todoService.update(params.id, data);
  }

  @Delete(':id')
  async delete(@Param() params: GetTodoInput): Promise<{}> {
    return await this.todoService.delete(params.id);
  }
}

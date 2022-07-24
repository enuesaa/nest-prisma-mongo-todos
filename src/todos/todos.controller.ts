import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseFilters,
} from '@nestjs/common';
import { TodosService } from '@/todos/todos.service';
import { CreateTodoDto } from '@/todos/dto/create-todo.dto';
import { IdDto } from '@/todos/dto/id.dto';
import { TodoDto } from '@/todos/dto/todo.dto';
import { TodoInterface } from '@/todos/interfaces/todo.interface';
import { AppFilter } from '@/app.filter';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  async list(): Promise<TodoDto[]> {
    return await this.todoService.find();
  }

  @Get(':id')
  @UseFilters(AppFilter)
  async view(@Param() { id }: IdDto): Promise<TodoDto> {
    return await this.todoService.findById(id);
  }

  @Post()
  async add(@Body() dto: CreateTodoDto): Promise<IdDto> {
    const id = await this.todoService.create(dto as TodoInterface);
    return { id: id };
  }

  @Put(':id')
  async edit(
    @Param() { id }: IdDto,
    @Body() dto: CreateTodoDto,
  ): Promise<IdDto> {
    await this.todoService.updateById(id, dto as TodoInterface);
    return { id: id };
  }

  @Delete(':id')
  async delete(@Param() { id }: IdDto): Promise<Record<string, never>> {
    await this.todoService.removeById(id);
    return {};
  }
}

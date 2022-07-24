import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { TodoInterface } from '@/todos/interfaces/todo.interface';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(): Promise<TodoInterface[]> {
    return await this.prismaService.todo.findMany();
  }

  async findById(id: string): Promise<TodoInterface> {
    const item = await this.prismaService.todo.findUnique({
      where: { id: id },
    });
    if (item === null) {
      throw new Error('not found');
    }
    return item;
  }

  async create(data: TodoInterface): Promise<string> {
    const id = this.prismaService.createObjectId();
    await this.prismaService.todo.create({ data: { ...data, id } });
    return id;
  }

  async updateById(id: string, data: TodoInterface): Promise<string> {
    await this.prismaService.todo.update({ where: { id: id }, data: data });
    return id;
  }

  async removeById(id: string): Promise<void> {
    await this.prismaService.todo.delete({ where: { id: id } });
  }
}

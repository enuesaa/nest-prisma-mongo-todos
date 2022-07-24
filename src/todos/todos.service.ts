import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service'; 
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  async findOne(todoWhereUniqueInput: Prisma.TodoWhereUniqueInput): Promise<Todo | null> {
    return this.prismaService.todo.findUnique({ where: todoWhereUniqueInput });
  }

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prismaService.todo.create({ data });
  }

  async update(id: string, data: Prisma.TodoUpdateInput): Promise<Todo> {
    return this.prismaService.todo.update({where: {id: id}, data: data });
  }

  async remove(id: string): Promise<{}> {
    return this.prismaService.todo.delete({where: {id: id}})
  }
}

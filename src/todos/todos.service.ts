import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service'; 
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prismaService.todo.create({ data });
  }

  async findById(todoWhereUniqueInput: Prisma.TodoWhereUniqueInput): Promise<Todo | null> {
    return this.prismaService.todo.findUnique({ where: todoWhereUniqueInput });
  }
}

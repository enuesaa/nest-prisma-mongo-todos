import { Todo } from '@prisma/client';

export interface TodoInterface extends Todo {
  id: string | null;
}

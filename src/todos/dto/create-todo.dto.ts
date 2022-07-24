import { IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string | null;
}

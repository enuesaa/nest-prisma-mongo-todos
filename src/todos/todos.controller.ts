import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('todos')
export class TodosController {

  @Get()
  list(): Array<{}> {
    return []
  }

  @Get(':id')
  view(@Param() params): {} {
    return {}
  }

  @Post()
  add(): {} {
    return {}
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

import { OnModuleInit } from '@nestjs/common'
import { INestApplication } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'bson'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }

  createObjectId(): string {
    return new ObjectId().toString()
  }
}

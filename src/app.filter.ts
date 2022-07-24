import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'

@Catch(Error)
export class AppFilter implements ExceptionFilter {
  catch(e: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(400).json({
      statusCode: 400,
      message: e.message,
      timestamp: new Date().toISOString(),
    })
  }
}

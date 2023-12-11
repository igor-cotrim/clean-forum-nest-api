import { NestFactory } from '@nestjs/core'

import { EnvService } from './env'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  await app.listen(port)
}

bootstrap()

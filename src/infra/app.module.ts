import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EnvModule, envSchema } from './env'
import { AuthModule } from './auth'
import { HttpModule } from './http'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EnvModule, envSchema } from './env'
import { AuthModule } from './auth'
import { HttpModule } from './http'
import { EventsModule } from './events'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
    EventsModule,
  ],
})
export class AppModule {}

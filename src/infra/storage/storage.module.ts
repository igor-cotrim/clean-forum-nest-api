import { Module } from '@nestjs/common'

import { Uploader } from '@/domain/forum/application/storage'
import { EnvModule } from '@/infra/env'
import { R2Storage } from './r2-storage'

@Module({
  imports: [EnvModule],
  providers: [{ provide: Uploader, useClass: R2Storage }],
  exports: [Uploader],
})
export class StorageModule {}

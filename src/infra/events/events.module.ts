import { Module } from '@nestjs/common'

import {
  OnAnswerCreated,
  OnQuestionBestAnswerChosen,
} from '@/domain/notification/application/subscribers'
import { SendNotificationUseCase } from '@/domain/notification/application/useCases'
import { DatabaseModule } from '@/infra/database'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}

import { Module } from '@nestjs/common'

import {
  CreateQuestionUseCase,
  FetchRecentQuestionsUseCase,
} from '@/domain/forum/application/useCases'
import { DatabaseModule } from '../database'
import {
  AuthenticateController,
  CreateAccountController,
  CreateQuestionController,
  FetchRecentQuestionsController,
} from './controllers'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [CreateQuestionUseCase, FetchRecentQuestionsUseCase],
})
export class HttpModule {}

import { Module } from '@nestjs/common'

import {
  AnswerQuestionUseCase,
  AuthenticateStudentUseCase,
  CreateQuestionUseCase,
  DeleteQuestionUseCase,
  EditQuestionUseCase,
  FetchRecentQuestionsUseCase,
  GetQuestionBySlugUseCase,
  RegisterStudentUseCase,
} from '@/domain/forum/application/useCases'
import { DatabaseModule } from '../database'
import { CryptographyModule } from '../cryptography'
import {
  AnswerQuestionController,
  AuthenticateController,
  CreateAccountController,
  CreateQuestionController,
  DeleteQuestionController,
  EditQuestionController,
  FetchRecentQuestionsController,
  GetQuestionBySlugController,
} from './controllers'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
  ],
})
export class HttpModule {}

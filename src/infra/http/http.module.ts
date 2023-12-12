import { Module } from '@nestjs/common'

import {
  AnswerQuestionUseCase,
  AuthenticateStudentUseCase,
  ChooseQuestionBestAnswerUseCase,
  CommentOnQuestionUseCase,
  CreateQuestionUseCase,
  DeleteAnswerUseCase,
  DeleteQuestionCommentUseCase,
  DeleteQuestionUseCase,
  EditAnswerUseCase,
  EditQuestionUseCase,
  FetchQuestionAnswersUseCase,
  FetchRecentQuestionsUseCase,
  GetQuestionBySlugUseCase,
  RegisterStudentUseCase,
} from '@/domain/forum/application/useCases'
import { DatabaseModule } from '../database'
import { CryptographyModule } from '../cryptography'
import {
  AnswerQuestionController,
  AuthenticateController,
  ChooseQuestionBestAnswerController,
  CommentOnQuestionController,
  CreateAccountController,
  CreateQuestionController,
  DeleteAnswerController,
  DeleteQuestionCommentController,
  DeleteQuestionController,
  EditAnswerController,
  EditQuestionController,
  FetchQuestionAnswersController,
  FetchRecentQuestionsController,
  GetQuestionBySlugController,
} from './controllers'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,

    FetchRecentQuestionsController,
    CreateQuestionController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    FetchQuestionAnswersController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,

    EditAnswerController,
    DeleteAnswerController,
    ChooseQuestionBestAnswerController,
  ],
  providers: [
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,

    FetchRecentQuestionsUseCase,
    CreateQuestionUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    FetchQuestionAnswersUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,

    EditAnswerUseCase,
    DeleteAnswerUseCase,
    ChooseQuestionBestAnswerUseCase,
  ],
})
export class HttpModule {}

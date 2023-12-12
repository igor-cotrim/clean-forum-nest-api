import { Module } from '@nestjs/common'

import {
  AnswerQuestionUseCase,
  AuthenticateStudentUseCase,
  ChooseQuestionBestAnswerUseCase,
  CommentOnAnswerUseCase,
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
  CommentOnAnswerController,
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
    CommentOnAnswerController,
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
    CommentOnAnswerUseCase,
  ],
})
export class HttpModule {}

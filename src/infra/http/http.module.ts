import { Module } from '@nestjs/common'

import {
  AnswerQuestionUseCase,
  AuthenticateStudentUseCase,
  ChooseQuestionBestAnswerUseCase,
  CommentOnAnswerUseCase,
  CommentOnQuestionUseCase,
  CreateQuestionUseCase,
  DeleteAnswerCommentUseCase,
  DeleteAnswerUseCase,
  DeleteQuestionCommentUseCase,
  DeleteQuestionUseCase,
  EditAnswerUseCase,
  EditQuestionUseCase,
  FetchAnswerCommentsUseCase,
  FetchQuestionAnswersUseCase,
  FetchQuestionCommentsUseCase,
  FetchRecentQuestionsUseCase,
  GetQuestionBySlugUseCase,
  RegisterStudentUseCase,
  UploadAndCreateAttachmentUseCase,
} from '@/domain/forum/application/useCases'
import { ReadNotificationUseCase } from '@/domain/notification/application/useCases'
import { DatabaseModule } from '../database'
import { CryptographyModule } from '../cryptography'
import { StorageModule } from '../storage'
import {
  AnswerQuestionController,
  AuthenticateController,
  ChooseQuestionBestAnswerController,
  CommentOnAnswerController,
  CommentOnQuestionController,
  CreateAccountController,
  CreateQuestionController,
  DeleteAnswerCommentController,
  DeleteAnswerController,
  DeleteQuestionCommentController,
  DeleteQuestionController,
  EditAnswerController,
  EditQuestionController,
  FetchAnswerCommentsController,
  FetchQuestionAnswersController,
  FetchQuestionCommentsController,
  FetchRecentQuestionsController,
  GetQuestionBySlugController,
  ReadNotificationController,
  UploadAttachmentController,
} from './controllers'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
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
    FetchQuestionCommentsController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,

    EditAnswerController,
    DeleteAnswerController,
    DeleteAnswerCommentController,
    ChooseQuestionBestAnswerController,
    CommentOnAnswerController,
    FetchAnswerCommentsController,

    UploadAttachmentController,

    ReadNotificationController,
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
    FetchQuestionCommentsUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,

    EditAnswerUseCase,
    DeleteAnswerUseCase,
    DeleteAnswerCommentUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnAnswerUseCase,
    FetchAnswerCommentsUseCase,

    UploadAndCreateAttachmentUseCase,

    ReadNotificationUseCase,
  ],
})
export class HttpModule {}

import { Module } from '@nestjs/common'

import { PrismaService } from './prisma'
import {
  PrismaAnswerAttachmentsRepository,
  PrismaAnswerCommentsRepository,
  PrismaAnswersRepository,
  PrismaAttachmentsRepository,
  PrismaNotificationsRepository,
  PrismaQuestionAttachmentsRepository,
  PrismaQuestionCommentsRepository,
  PrismaQuestionsRepository,
  PrismaStudentsRepository,
} from './prisma/repositories'
import {
  AnswerAttachmentsRepository,
  AnswerCommentsRepository,
  AnswersRepository,
  AttachmentsRepository,
  QuestionAttachmentsRepository,
  QuestionCommentsRepository,
  QuestionsRepository,
  StudentsRepository,
} from '@/domain/forum/application/repositories'
import { NotificationsRepository } from '@/domain/notification/application/repositories'

@Module({
  providers: [
    PrismaService,
    { provide: QuestionsRepository, useClass: PrismaQuestionsRepository },
    { provide: StudentsRepository, useClass: PrismaStudentsRepository },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    { provide: AnswersRepository, useClass: PrismaAnswersRepository },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    AnswersRepository,
    AnswerAttachmentsRepository,
    AnswerCommentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'

import { DomainEvents, EventHandler } from '@/core/events'
import { QuestionsRepository } from '@/domain/forum/application/repositories'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events'
import { SendNotificationUseCase } from '../useCases'

@Injectable()
export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this) as any,
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotificationUseCase.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title
          .substring(0, 40)
          .concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}

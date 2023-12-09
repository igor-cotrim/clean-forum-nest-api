/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainEvents, EventHandler } from '@/core/events'
import { AnswersRepository } from '@/domain/forum/application/repositories'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events'
import { SendNotificationUseCase } from '../useCases'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this) as any,
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.sendNotificationUseCase.execute({
        recipientId: answer.authorId.toString(),
        title: 'Sua resposta foi escolhida como a melhor resposta!',
        content: `A sua resposta foi escolhida como a melhor resposta da pergunta "${question.title
          .substring(0, 20)
          .concat('...')}".`,
      })
    }
  }
}

import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowerError, ResourceNotFoundError } from '@/core/errors'
import { QuestionsRepository } from '@/domain/forum/application/repositories'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowerError,
  null
>

@Injectable()
export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowerError())
    }

    await this.questionsRepository.delete(question)

    return right(null)
  }
}

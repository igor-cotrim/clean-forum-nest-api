import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowerError, ResourceNotFoundError } from '@/core/errors'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowerError,
  null
>

@Injectable()
export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) return left(new ResourceNotFoundError())

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowerError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right(null)
  }
}

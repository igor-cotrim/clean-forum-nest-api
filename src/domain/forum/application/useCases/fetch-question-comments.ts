import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  { comments: CommentWithAuthor[] }
>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    return right({ comments })
  }
}

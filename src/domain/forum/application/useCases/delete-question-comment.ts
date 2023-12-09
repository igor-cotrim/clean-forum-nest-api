import { Either, left, right } from '@/core/either'
import { NotAllowerError, ResourceNotFoundError } from '@/core/errors'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowerError,
  null
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) return left(new ResourceNotFoundError())

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowerError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}

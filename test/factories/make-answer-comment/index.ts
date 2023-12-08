import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}

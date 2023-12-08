import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities'
import { AnswerProps, Answer } from '@/domain/forum/enterprise/entities'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
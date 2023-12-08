import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities'
import { Question, QuestionProps } from '@/domain/forum/enterprise/entities'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}

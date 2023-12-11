import { Attachment as PrismaAttachment } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) throw new Error('Invalid attachment type')

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        questionId: new UniqueEntityId(raw.questionId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}

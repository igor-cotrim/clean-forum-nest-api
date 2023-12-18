import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    if (!raw.answerId) throw new Error('Invalid attachment type')

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        answerId: new UniqueEntityId(raw.answerId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toUpdateMany(
    attachments: AnswerAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    return {
      where: { id: { in: attachmentIds } },
      data: {
        answerId: attachments[0].answerId.toString(),
      },
    }
  }
}

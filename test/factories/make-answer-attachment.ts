import { Injectable } from '@nestjs/common'

import { UniqueEntityId } from '@/core/entities'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities'
import { PrismaService } from '@/infra/database/prisma'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answer = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return answer
}

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerAttachment(
    data: Partial<AnswerAttachmentProps> = {},
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachment(data)

    await this.prisma.attachment.update({
      where: { id: answerAttachment.attachmentId.toString() },
      data: {
        answerId: answerAttachment.answerId.toString(),
      },
    })

    return answerAttachment
  }
}

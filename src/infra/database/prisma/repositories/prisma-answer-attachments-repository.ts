import { Injectable } from '@nestjs/common'

import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities'
import { PrismaAnswerAttachmentMapper } from '@/infra/database/prisma/mappers'
import { PrismaService } from '@/infra/database/prisma'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) return

    const data = PrismaAnswerAttachmentMapper.toUpdateMany(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) return

    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    await this.prisma.attachment.deleteMany({
      where: { id: { in: attachmentIds } },
    })
  }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: { answerId },
    })

    return answerAttachments.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { answerId },
    })
  }
}

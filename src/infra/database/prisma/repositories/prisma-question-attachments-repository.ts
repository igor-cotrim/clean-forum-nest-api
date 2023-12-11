import { Injectable } from '@nestjs/common'

import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities'
import { PrismaQuestionAttachmentMapper } from '@/infra/database/prisma/mappers'
import { PrismaService } from '@/infra/database/prisma'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: { questionId },
    })

    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { questionId },
    })
  }
}

import { Injectable } from '@nestjs/common'

import { AttachmentsRepository } from '@/domain/forum/application/repositories'
import { Attachment } from '@/domain/forum/enterprise/entities'
import { PrismaAttachmentMapper } from '@/infra/database/prisma/mappers'
import { PrismaService } from '@/infra/database/prisma'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPersistence(attachment)

    await this.prisma.attachment.create({ data })
  }
}

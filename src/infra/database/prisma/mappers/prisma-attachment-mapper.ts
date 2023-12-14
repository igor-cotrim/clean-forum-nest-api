import { Prisma } from '@prisma/client'

import { Attachment } from '@/domain/forum/enterprise/entities'

export class PrismaAttachmentMapper {
  static toPersistence(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}

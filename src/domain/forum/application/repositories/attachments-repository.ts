import { Attachment } from '@/domain/forum/enterprise/entities'

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}

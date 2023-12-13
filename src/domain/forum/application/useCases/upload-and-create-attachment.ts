import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { InvalidAttachmentTypeError } from '@/core/errors'
import { AttachmentsRepository } from '@/domain/forum/application/repositories'
import { Uploader } from '@/domain/forum/application/storage'
import { Attachment } from '@/domain/forum/enterprise/entities'

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  { attachment: Attachment }
>

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentsRepository.create(attachment)

    return right({ attachment })
  }
}

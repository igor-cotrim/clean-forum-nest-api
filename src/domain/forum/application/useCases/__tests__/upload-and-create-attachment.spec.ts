import { InvalidAttachmentTypeError } from '@/core/errors'
import { InMemoryAttachmentsRepository } from 'test/repositories'
import { FakeUploader } from 'test/storage'
import { UploadAndCreateAttachmentUseCase } from '../upload-and-create-attachment'

let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let fakeUploader: FakeUploader
let sut: UploadAndCreateAttachmentUseCase

describe('#Upload and Create UseCase', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'sample-upload.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({ fileName: 'sample-upload.png' }),
    )
  })

  it('should not be able to upload an attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'sample-upload.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})

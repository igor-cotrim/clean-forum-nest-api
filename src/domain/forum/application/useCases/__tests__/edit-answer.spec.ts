import { UniqueEntityId } from '@/core/entities'
import { NotAllowerError } from '@/core/errors'
import {
  InMemoryAnswerAttachmentsRepository,
  InMemoryAnswersRepository,
} from 'test/repositories'
import { makeAnswer, makeAnswerAttachment } from 'test/factories'
import { EditAnswerUseCase } from '../edit-answer'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('#Edit Answer UseCase', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    )
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('attachment-1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('attachment-2'),
      }),
    )

    await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content: 'New content',
      attachmentsIds: ['attachment-1', 'attachment-3'],
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'New content',
    })
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({
          attachmentId: new UniqueEntityId('attachment-1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('attachment-3'),
        }),
      ],
    )
  })

  it('should be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: newAnswer.id.toString(),
      content: 'New content',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowerError)
  })

  it('should sync new and removed attachments when editing an answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('attachment-1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('attachment-2'),
      }),
    )

    const result = await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content: 'New content',
      attachmentsIds: ['attachment-1', 'attachment-3'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryAnswerAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('attachment-1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('attachment-3'),
        }),
      ]),
    )
  })
})

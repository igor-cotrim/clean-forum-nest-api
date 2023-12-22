import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database'
import {
  AttachmentFactory,
  QuestionAttachmentFactory,
  QuestionFactory,
  StudentFactory,
} from 'test/factories'
import { CacheModule, CacheRepository } from '@/infra/cache'
import { QuestionsRepository } from '@/domain/forum/application/repositories'

describe('#Prisma Questions Repository (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let cacheRepository: CacheRepository
  let questionsRepository: QuestionsRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    cacheRepository = moduleRef.get(CacheRepository)
    questionsRepository = moduleRef.get(QuestionsRepository)

    await app.init()
  })

  it('should cache question details', async () => {
    const { id: userId } = await studentFactory.makePrismaStudent()

    const { slug, id: questionId } = await questionFactory.makePrismaQuestion({
      authorId: userId,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId,
    })

    const questionDetails = await questionsRepository.findDetailsBySlug(
      slug.value,
    )

    const cached = await cacheRepository.get(`question:${slug.value}:details`)

    expect(cached).toEqual(JSON.stringify(questionDetails))
  })

  it('should return cached question details on subsequent calls', async () => {
    const { id: userId } = await studentFactory.makePrismaStudent()

    const { slug, id: questionId } = await questionFactory.makePrismaQuestion({
      authorId: userId,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId,
    })

    await cacheRepository.set(
      `question:${slug.value}:details`,
      JSON.stringify({ empty: true }),
    )

    const questionDetails = await questionsRepository.findDetailsBySlug(
      slug.value,
    )

    expect(questionDetails).toEqual({ empty: true })
  })

  it('should reset question detauls cache when saving the question', async () => {
    const { id: userId } = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: userId,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    await cacheRepository.set(
      `question:${question.slug.value}:details`,
      JSON.stringify({ empty: true }),
    )

    await questionsRepository.save(question)

    const cached = await cacheRepository.get(
      `question:${question.slug.value}:details`,
    )

    expect(cached).toBeNull()
  })
})

import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'

import { DomainEvents } from '@/core/events'
import { PrismaService } from '@/infra/database/prisma'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database'
import { QuestionFactory, StudentFactory } from 'test/factories'
import { waitFor } from 'test/utils'

describe('#On Answer Created (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)

    jwt = moduleRef.get(JwtService)

    DomainEvents.shouldRun = true

    await app.init()
  })

  it('should send a notification when answer is created', async () => {
    const { id: userId } = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: userId.toString() })

    const { id: questionId } = await questionFactory.makePrismaQuestion({
      authorId: userId,
    })

    await request(app.getHttpServer())
      .post(`/questions/${questionId.toString()}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New  answer',
        attachments: [],
      })

    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: { recipientId: userId.toString() },
      })

      expect(notificationOnDatabase).not.toBeNull()
    })
  })
})

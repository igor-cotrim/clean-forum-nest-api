import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'

import { PrismaService } from '@/infra/database/prisma'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database'
import { AnswerFactory, QuestionFactory, StudentFactory } from 'test/factories'

describe('#Comment On Answer (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /answers/:answerId/comments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const { id: questionId } = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const { id: answerId } = await answerFactory.makePrismaAnswer({
      questionId,
      authorId: user.id,
    })

    const response = await request(app.getHttpServer())
      .post(`/answers/${answerId.toString()}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New comment',
      })

    expect(response.statusCode).toBe(201)

    const commentOnDatabase = await prisma.comment.findFirst({
      where: { content: 'New comment' },
    })

    expect(commentOnDatabase).toBeTruthy()
  })
})

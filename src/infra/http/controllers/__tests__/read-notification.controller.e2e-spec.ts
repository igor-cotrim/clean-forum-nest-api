import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database'
import { PrismaService } from '@/infra/database/prisma'
import { NotificationFactory, StudentFactory } from 'test/factories'

describe('#Read Notification (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let notificationFactory: NotificationFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, NotificationFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    notificationFactory = moduleRef.get(NotificationFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /notifications/:notificationId/read', async () => {
    const { id: userId } = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: userId.toString() })

    const { id: notificationId } =
      await notificationFactory.makePrismaNotification({
        recipientId: userId,
      })

    const response = await request(app.getHttpServer())
      .patch(`/notifications/${notificationId.toString()}/read`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const notificationOnDatabase = await prisma.notification.findFirst({
      where: { recipientId: userId.toString() },
    })

    expect(notificationOnDatabase?.readAt).not.toBeNull()
  })
})

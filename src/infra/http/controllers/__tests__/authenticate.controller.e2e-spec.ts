import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'

import { PrismaService } from '@/infra/prisma'
import { AppModule } from '@/infra/app.module'

describe('#Authenticate (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: await hash('123456789', 8),
      },
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '123456789',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('access_token')
  })
})

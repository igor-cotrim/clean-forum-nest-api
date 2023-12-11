import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories'
import { AnswersRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'
import { PrismaAnswerMapper } from '@/infra/database/prisma/mappers'
import { PrismaService } from '@/infra/database/prisma'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
    })
    if (!answer) return null

    return PrismaAnswerMapper.toDomain(answer)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const perPage = 20
    const answers = await this.prisma.answer.findMany({
      where: { questionId },
      orderBy: { createdAt: 'desc' },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return answers.map(PrismaAnswerMapper.toDomain)
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPersistence(answer)

    await this.prisma.answer.create({
      data,
    })
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPersistence(answer)

    await this.prisma.answer.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: { id: answer.id.toString() },
    })
  }
}

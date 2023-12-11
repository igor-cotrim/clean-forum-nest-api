import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories'
import { AnswerComment } from '@/domain/forum/enterprise/entities'
import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers'
import { PrismaService } from '@/infra/database/prisma'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: { id },
    })
    if (!answerComment) return null

    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const perPage = 20
    const answerComments = await this.prisma.comment.findMany({
      where: { answerId },
      orderBy: { createdAt: 'desc' },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return answerComments.map(PrismaAnswerCommentMapper.toDomain)
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPersistence(answerComment)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: answerComment.id.toString() },
    })
  }
}

import { Injectable } from '@nestjs/common'

import { NotificationsRepository } from '@/domain/notification/application/repositories'
import { Notification } from '@/domain/notification/enterprise/entities'
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers'
import { PrismaService } from '@/infra/database/prisma'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    })
    if (!notification) return null

    return PrismaNotificationMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification)

    await this.prisma.notification.create({
      data,
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification)

    await this.prisma.notification.update({
      where: { id: data.id },
      data,
    })
  }
}

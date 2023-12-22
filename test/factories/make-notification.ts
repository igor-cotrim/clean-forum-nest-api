import { Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities'
import { PrismaService } from '@/infra/database/prisma'
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification
}

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNotification(
    data: Partial<NotificationProps> = {},
  ): Promise<Notification> {
    const notification = makeNotification(data)

    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPersistence(notification),
    })

    return notification
  }
}

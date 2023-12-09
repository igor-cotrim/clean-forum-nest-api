import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities'

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
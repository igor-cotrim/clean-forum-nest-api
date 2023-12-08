import { Either, left, right } from '@/core/either'
import { NotAllowerError, ResourceNotFoundError } from '@/core/errors'
import { Notification } from '@/domain/notification/enterprise/entities'
import { NotificationsRepository } from '../../repositories'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowerError,
  { notification: Notification }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) return left(new ResourceNotFoundError())

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowerError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({ notification })
  }
}

import { UniqueEntityId } from '@/core/entities'
import { NotAllowerError } from '@/core/errors'
import { InMemoryNotificationsRepository } from 'test/repositories'
import { makeNotification } from 'test/factories'
import { ReadNotificationUseCase } from '../read-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('#Send Notification UseCase', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to create an notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityId('1'),
    })

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: '2',
      notificationId: notification.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowerError)
  })
})

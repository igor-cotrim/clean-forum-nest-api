import { InMemoryNotificationsRepository } from 'test/repositories'
import { SendNotificationUseCase } from '.'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('#Send Notification UseCase', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to create an notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'New Title',
      content: 'New Content',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})

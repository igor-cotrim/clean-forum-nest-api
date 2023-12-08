import { Either, left, right } from '.'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

describe('#Either', () => {
  it('should be have a success result', () => {
    const result = doSomething(true)

    expect(result.isRight()).toBe(true)
  })

  it('should be have a error result', () => {
    const result = doSomething(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
  })
})

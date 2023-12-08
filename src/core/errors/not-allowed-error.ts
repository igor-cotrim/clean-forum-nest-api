import { UseCaseError } from '@/core/errors'

export class NotAllowerError extends Error implements UseCaseError {
  constructor() {
    super('Not allower')

    this.name = 'NotAllowerError'
  }
}

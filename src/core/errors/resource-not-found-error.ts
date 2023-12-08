import { UseCaseError } from '@/core/errors'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')

    this.name = 'ResourceNotFoundError'
  }
}

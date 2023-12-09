import { UseCaseError } from '@/core/errors'

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Credentials are not valid.')

    this.name = 'WrongCredentialsError'
  }
}

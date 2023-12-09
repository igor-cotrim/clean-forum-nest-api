import { UseCaseError } from '@/core/errors'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student "${identifier}" address already exists.`)

    this.name = 'StudentAlreadyExistsError'
  }
}

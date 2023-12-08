import { Entity, UniqueEntityId } from '@/core/entities'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntityId) {
    const instructor = new Instructor(
      {
        ...props,
      },
      id,
    )

    return instructor
  }
}

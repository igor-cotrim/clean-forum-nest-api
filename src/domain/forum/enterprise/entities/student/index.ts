import { Entity, UniqueEntityId } from '@/core/entities'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(
      {
        ...props,
      },
      id,
    )

    return student
  }
}

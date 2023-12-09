import { Slug } from '../slug'

describe('#Slug', () => {
  it('should create a slug from a text', () => {
    const slug = Slug.createFromText('This is a slug')

    expect(slug.value).toEqual('this-is-a-slug')
  })
})

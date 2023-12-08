import { Slug } from '.'

describe('#Slug', () => {
  it('should create a slug from a text', () => {
    const slug = Slug.createFromText('This is a slug')

    expect(slug.value).toEqual('this-is-a-slug')
  })
})

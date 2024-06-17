import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GenreListItem from '../GenreListItem.vue'

describe('GenreListItem', () => {
  it('should display a genre list item', async () => {
    const wrapper = mount(GenreListItem, {
      props: {
        genre: 'Anime',
      },
    })

    expect(wrapper.text()).toContain('Anime')
  })

  it('should emit changeGenre after changing the genre', async () => {
    const wrapper = mount(GenreListItem, {
      props: {
        genre: 'Anime',
      },
    })

    await wrapper.find('li').trigger('click')

    expect(wrapper.emitted('changeGenre')).toHaveLength(1)
  })
})

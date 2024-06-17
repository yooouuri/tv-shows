import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import TvShowListItem from '../TvShowListItem.vue'

describe('TvShowListItem', () => {
  it('should display a tv show list item', async () => {
    const wrapper = mount(TvShowListItem, {
      props: {
        name: 'Chuck',
        averageRating: 10,
        image: 'https://google.nl/'
      },
    })

    expect(wrapper.text()).toContain('Chuck')
    expect(wrapper.text()).toContain('(10 / 10)')
  })

  it('should emit openShow after clicking tv show image', async () => {
    const wrapper = mount(TvShowListItem, {
      props: {
        name: 'Chuck',
        averageRating: 10,
        image: 'https://google.nl/'
      },
    })

    await wrapper.find('img').trigger('click')

    expect(wrapper.emitted('openShow')).toHaveLength(1)
  })
})

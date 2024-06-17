import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GenreList from '../GenreList.vue'
import GenreListItem from '../GenreListItem.vue'

describe('GenreList', () => {
  const genres = [ 'Drama', 'Science-Fiction', 'Thriller', 'Action', 'Crime' ]

  it('should display the expanded list of genres after click', async () => {
    const wrapper = mount(GenreList, {
      props: {
        genres,
      },
    })

    await wrapper.find('[data-testid="show-more-genres"]').trigger('click')

    expect(wrapper.find('[data-testid="all-genres"]').isVisible()).toBeTruthy()

    await wrapper.find('[data-testid="hide-genres"]').trigger('click')

    expect(wrapper.find('[data-testid="all-genres"]').exists()).toBeFalsy()
  })

  it('should display the first 3 genres', async () => {
    const wrapper = mount(GenreList, {
      props: {
        genres,
      },
    })

    expect(wrapper.find('[data-testid="all-genres"]').exists()).toBeFalsy()
    expect(wrapper.findAll('li')[0].text()).toBe('Drama')
    expect(wrapper.findAll('li')[1].text()).toBe('Science-Fiction')
    expect(wrapper.findAll('li')[2].text()).toBe('Thriller')
  })

  it('should change the genre', async () => {
    const wrapper = mount(GenreList, {
      props: {
        genres,
      },
    })

    await wrapper.find('[data-testid="first-genres"]').findAllComponents(GenreListItem)[0].find('li').trigger('click')

    expect(wrapper.emitted('changeGenre'))

    await wrapper.find('[data-testid="show-more-genres"]').trigger('click')

    await wrapper.find('[data-testid="all-genres"]').findAllComponents(GenreListItem)[0].find('li').trigger('click')

    expect(wrapper.emitted('changeGenre'))
  })
})


// it('renders first three genres in the navbar', async () => {
//   router.push('/')

//   await router.isReady()

//   const wrapper = mount(Home, {
//     global: {
//       plugins: [router]
//     }
//   })

//   await flushPromises()

//   expect(wrapper.vm.genres.length).toBe(5)
//   expect(wrapper.vm.genres.sort()).toStrictEqual([ 'Drama', 'Science-Fiction', 'Thriller', 'Action', 'Crime' ].sort())

//   expect(wrapper.findAll('li')[0].text()).toBe('Drama')
//   expect(wrapper.findAll('li')[1].text()).toBe('Science-Fiction')
//   expect(wrapper.findAll('li')[2].text()).toBe('Thriller')
// })
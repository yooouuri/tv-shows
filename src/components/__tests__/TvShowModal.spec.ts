import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import TvShowModal from '../TvShowModal.vue'

describe('TvShowModal', () => {
  const show = {
    "id": 1,
    "url": "https://www.tvmaze.com/shows/1/under-the-dome",
    "name": "Under the Dome",
    "type": "Scripted",
    "language": "English",
    "genres": [
        "Drama",
        "Science-Fiction",
        "Thriller"
    ],
    "status": "Ended",
    "runtime": 60,
    "averageRuntime": 60,
    "premiered": "2013-06-24",
    "ended": "2015-09-10",
    "officialSite": "http://www.cbs.com/shows/under-the-dome/",
    "schedule": {
        "time": "22:00",
        "days": [
            "Thursday"
        ]
    },
    "rating": {
        "average": 6.5
    },
    "weight": 98,
    "network": {
        "id": 2,
        "name": "CBS",
        "country": {
            "name": "United States",
            "code": "US",
            "timezone": "America/New_York"
        },
        "officialSite": "https://www.cbs.com/"
    },
    "webChannel": null,
    "dvdCountry": null,
    "externals": {
        "tvrage": 25988,
        "thetvdb": 264492,
        "imdb": "tt1553656"
    },
    "image": {
        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
        "original": "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
    },
    "summary": "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
    "updated": 1704794065,
    "_links": {
        "self": {
            "href": "https://api.tvmaze.com/shows/1"
        },
        "previousepisode": {
            "href": "https://api.tvmaze.com/episodes/185054",
            "name": "The Enemy Within"
        }
    }
  }

  // it('should close the modal when click on the cross', async () => {
  //   const wrapper = mount(TvShowModal, {
  //     props: {
  //       show,
  //     }
  //   })

  //   const closeModal = vi.spyOn(wrapper.vm, 'closeModal')

  //   await wrapper.find('[data-testid="close-tv-show"]').trigger('click')

  //   expect(closeModal).toHaveBeenCalledOnce()
  // })

  // it('should close the modal when click on the backdrop', async () => {
  //   const wrapper = mount(TvShowModal, {
  //     props: {
  //       show,
  //     },
  //   })
  // })

  it('should display a TV show with its information', async () => {
    const wrapper = mount(TvShowModal, {
      props: {
        show,
      },
    })

    expect(wrapper.find('[data-testid="show-title"]').text()).toContain(show.name)
    expect(wrapper.find('[data-testid="show-genres"]').text()).toContain(show.genres.join(''))

    if (show.ended !== null) {
      expect(wrapper.find('[data-testid="show-ended"]').exists()).toBeTruthy()
      expect(wrapper.find('[data-testid="show-ended"]').text()).toBe('- 2015')
    }

    expect(wrapper.find('[data-testid="show-premiered"]').text()).toBe('2013')
    expect(wrapper.find('[data-testid="show-averageRuntime"]').text()).toContain(`${show.averageRuntime} min.`)
  })
})

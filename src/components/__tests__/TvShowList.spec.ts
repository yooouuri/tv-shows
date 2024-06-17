import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import TvShowList from '../TvShowList.vue'
import TvShowListItem from '../TvShowListItem.vue'

describe('TvShowList', () => {
  const shows = [
    {
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
    },
    {
      "id": 2,
      "url": "https://www.tvmaze.com/shows/2/person-of-interest",
      "name": "Person of Interest",
      "type": "Scripted",
      "language": "English",
      "genres": [
          "Action",
          "Crime",
          "Science-Fiction"
      ],
      "status": "Ended",
      "runtime": 60,
      "averageRuntime": 60,
      "premiered": "2011-09-22",
      "ended": "2016-06-21",
      "officialSite": "http://www.cbs.com/shows/person_of_interest/",
      "schedule": {
          "time": "22:00",
          "days": [
              "Tuesday"
          ]
      },
      "rating": {
          "average": 8.8
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
          "tvrage": 28376,
          "thetvdb": 248742,
          "imdb": "tt1839578"
      },
      "image": {
          "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg",
          "original": "https://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg"
      },
      "summary": "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I designed the Machine to detect acts of terror but it sees everything. Violent crimes involving ordinary people. People like you. Crimes the government considered \"irrelevant\". They wouldn't act so I decided I would. But I needed a partner. Someone with the skills to intervene. Hunted by the authorities, we work in secret. You'll never find us. But victim or perpetrator, if your number is up, we'll find you.</p>",
      "updated": 1717084401,
      "_links": {
          "self": {
              "href": "https://api.tvmaze.com/shows/2"
          },
          "previousepisode": {
              "href": "https://api.tvmaze.com/episodes/659372",
              "name": "return 0"
          }
      }
    },
  ]

  it('should display all the TV shows when no genre is selected', async () => {
    const wrapper = mount(TvShowList, {
      props: {
        shows,
        genres: ['Science-Fiction', 'Sports', 'Anime'],
        genre: '',
      },
    })

    expect(wrapper.findAll('[data-testid="tv-show-in-grid"]').length).toBe(2)
  })

  it('should display "No TV shows found..."', async () => {
    const wrapper = mount(TvShowList, {
      props: {
        shows: [],
        genres: ['Science-Fiction', 'Sports', 'Anime'],
        genre: 'Sports',
      },
    })

    expect(wrapper.text()).toContain('No TV shows found, try a different search term perhaps')
  })

  it('should display a list of tv shows for the given genre', async () => {
    const wrapper = mount(TvShowList, {
      props: {
        shows,
        genres: ['Science-Fiction', 'Sports', 'Anime'],
        genre: 'Science-Fiction',
      },
    })

    expect(wrapper.text()).toContain('Under the Dome')
    expect(wrapper.text()).toContain('Person of Interest')
  })

  it('should emit openShow after clicking on tv show', async () => {
    const wrapper = mount(TvShowList, {
      props: {
        shows,
        genres: ['Science-Fiction', 'Sports', 'Anime'],
        genre: 'Science-Fiction',
      },
    })

    await wrapper.findAllComponents(TvShowListItem)[0].find('img').trigger('click')

    expect(wrapper.emitted('openShow')).toHaveLength(1)
  })

  it('should reset the tv show list scroll position when the list of shows changes', async () => {
    vi.mock('swiper')

    const wrapper = mount(TvShowList, {
      props: {
        shows,
        genres: ['Science-Fiction', 'Sports', 'Anime'],
        genre: 'Science-Fiction',
      },
    })

    // @ts-ignore
    const slideTo = vi.spyOn(wrapper.vm.swiperInstance, 'slideTo').mockImplementation(() => ({
      slideTo: vi.fn(),
    }))

    await wrapper.setProps({
      shows: [],
    })

    expect(slideTo).toHaveBeenCalled()
  })

  it('should display selected genre title', async () => {
    const wrapper = mount(TvShowList, {
      props: {
        shows,
        genres: ['Science-Fiction', 'Sports', 'Anime'],
        genre: 'Science-Fiction',
      },
    })

    expect(wrapper.find('[data-testid="selected-genre"]').text()).toContain('Science-Fiction')
  })

  it('should display no selected genre title', async () => {
    const wrapper = mount(TvShowList, {
      props: {
        shows,
        genres: ['Science-Fiction', 'Sports', 'Anime'],
        genre: '',
      },
    })

    expect(wrapper.find('[data-testid="no-genre"]').text()).toBe('No genre selected')
  })

  it('should show loading when no tv shows are loaded from the API call', async () => {
    const wrapper = mount(TvShowList, {
      props: {
        shows: null,
        genres: ['Science-Fiction', 'Sports', 'Anime'],
        genre: '',
      },
    })

    expect(wrapper.text()).toContain('Loading...')
  })
})

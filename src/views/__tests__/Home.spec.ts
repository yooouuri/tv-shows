import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Home from '../Home.vue'
import router from '@/router'
import type { Show } from '@/Show'
import TvShowModal from '@/components/TvShowModal.vue'
import TvShowListItem from '@/components/TvShowListItem.vue'
import GenreListItem from '@/components/GenreListItem.vue'

vi.spyOn(global, 'fetch')
  // @ts-ignore
  .mockImplementation((url) => {
    if (url === 'https://api.tvmaze.com/shows/2') {
      return Promise.resolve({ json: () => {
        return Promise.resolve({
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
        })
      }})
    }

    return Promise.resolve({ json: () => Promise.resolve([
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
    ]) })
  })

describe('Home', () => {
  it('should show tv shows based on their average scrore', async () => {
    router.push('/Science-Fiction')

    await router.isReady()

    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    await flushPromises()

    // @ts-ignore
    const shows: Show[] = wrapper.vm.shows

    for (let i = 0; i < shows.length; i++) {
      if (i === 0) {
        continue
      }

      expect((shows[i -1] as Show).rating.average).toBeGreaterThanOrEqual((shows[i] as Show).rating.average!)
    }
  })

  it('should select genre from the nav', async () => {
    router.push('/')

    await router.isReady()

    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    await flushPromises()

    await wrapper.findAllComponents(GenreListItem)[0].trigger('click')

    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/Action')
  })

  it('should select genre from url', async () => {
    router.push('/Drama')

    await router.isReady()

    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Under the Dome')
    expect(wrapper.find('[data-testid="tv-shows"]').element.children.length).toBe(1)
  })

  it('should search for tv shows', async () => {
    router.push('/Science-Fiction')

    await router.isReady()

    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    await flushPromises()

    await wrapper.find('input').setValue('Dome')

    expect(wrapper.text()).toContain('Under the Dome')
    expect(wrapper.text()).not.toContain('Person of Interest')

    // @ts-ignore
    expect(wrapper.vm.shows.length).toBe(1)

    await wrapper.find('input').setValue('')

    expect(wrapper.text()).toContain('Under the Dome')
    expect(wrapper.text()).toContain('Person of Interest')
    // @ts-ignore
    expect(wrapper.vm.shows.length).toBe(2)
  })

  it('should display a detailed view of the selected show', async () => {
    router.push('/Science-Fiction')

    await router.isReady()

    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    await flushPromises()

    await wrapper.findAllComponents(TvShowListItem)[0].find('img').trigger('click')

    await flushPromises()

    // @ts-ignore
    expect(wrapper.vm.state.show).not.toBeNull()
    expect(wrapper.findComponent(TvShowModal).exists()).toBeTruthy()
  })

  it('should show error message when retreiving shows failed', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject())

    router.push('/Science-Fiction')

    await router.isReady()

    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    await flushPromises()
    
    expect(wrapper.text()).toContain('Failed to retreive tv shows, please try again')
  })
})

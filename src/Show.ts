export type Show = {
  id: number
  name: string
  genres: string[]
  image: {
    medium: string
    original: string
  }
  rating: {
    average: number | null
  }
  summary: string
  averageRuntime: number
  premiered: string
  ended: string | null
  externals: {
    imdb: string | null
    thetvdb: number | null
    tvrage: number | null
  }
}

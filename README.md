# tv-shows

## Project Setup

### Requirements

* Node.js 20
* npm

### Install dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run the build

```sh
npm run preview
```

And navigate to http://localhost:4173/ 

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Project structure and architectural decisions

* Vue Router is used to keep the selected genre in memory, so when the user refreshes the application, the genre is still known.
* The home view is kept as simple as possible, responsible for only knowing the shows, genres, and currently selected show.
* The other components are decoupled from the home view in a way that makes them easy to test and reuse if needed.
* To create the horizontal TV show navigation, [Swiper](https://swiperjs.com) is used. With Tailwind, it's possible to create a horizontal scroll snap navigation, but it’s way too hard to implement JS navigation (forward and backward, etc.).
* The shows summary contains HTML code, because we can't control the data, sanitizing is a must.

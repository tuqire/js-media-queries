function validateMediaQueries (mediaQueries) {
  let zeroMediaQueryFound = false
  const defaultMediaQueries = {
    xxs: 0,
    xs: 320,
    s: 480,
    m: 768,
    l: 1024,
    xl: 1224,
    xxl: 1824
  }
  const defaultMediaQueriesMessage = `Defaulting to: ${JSON.stringify(defaultMediaQueries)}`

  let errors = !mediaQueries || Object.keys(mediaQueries).some(mediaQuery => {
    if (typeof mediaQueries[mediaQuery] !== 'number') {
      console.error('Media queries provided should be integers', defaultMediaQueriesMessage)
      return true
    }

    if (typeof mediaQueries[mediaQuery] < 0) {
      console.error('Media queries provided should be larger than 0', defaultMediaQueriesMessage)
      return true
    }

    zeroMediaQueryFound = zeroMediaQueryFound || mediaQueries[mediaQuery] === 0
    return false
  })

  if (mediaQueries && !zeroMediaQueryFound) {
    console.error('A key should be for 0px break point', defaultMediaQueriesMessage)
    errors = true
  }

  return errors ? defaultMediaQueries : mediaQueries
}

function setBreakpoint (mediaQueriesStore) {
  const mediaQuery = Object.keys(mediaQueriesStore)
    .sort((mediaQuery1, mediaQuery2) => mediaQueriesStore[mediaQuery1] > mediaQueriesStore[mediaQuery2] ? -1 : 1)
    .find(mediaQuery => window.matchMedia(`(min-width: ${mediaQueriesStore[mediaQuery]}px)`).matches)

  return mediaQuery
}

const setMediaQueries = mediaQueries => {
  const mediaQueriesStore = validateMediaQueries(mediaQueries)
  let cachedMediaQuery = setBreakpoint(mediaQueriesStore)

  window.addEventListener('resize', () => {
    cachedMediaQuery = setBreakpoint(mediaQueriesStore)
  })

  return () => cachedMediaQuery
}

export default setMediaQueries

# JS Media Queries

Allows the use of media queries in javascript. Caches result on first call, and then updates the value on window resize event.


## How it Works

Example use case.

```js
import setMediaQueries from 'js-media-queries';

// The media queries to register
// Must have a key registered for 0px
// Must be numbers only
const mediaQueries = {
  xxs: 0,
  xs: 320,
  s: 480,
  m: 768,
  l: 1024,
  xl: 1224,
  xxl: 1824
};

const getBreakPoint = setMediaQueries(mediaQueries);

// Call getBreakPoint to get the current break point
// The break point is cached and recalculated when the window is resized
// will return the key of the breakpoint (xxs, xs, s, m, l, xl)
const breakPoint = getBreakPoint();

// Example use case
const screenSize = {
  xxs: 'small screen mobile',
  xs: 'medium screen mobile',
  s: 'large screen mobile',
  m: 'iPad',
  l: 'small screen desktop',
  xl: 'medium screen desktop',
  xxl: 'large screen desktop'
};

console.log(`You are currently on a ${screenSize[breakPoint]}`);

```

## Todo

1. Add unit tests

## Contributors

* Tuqire Hussain <me@tuqire.com>

# clock

a JavaScript idiomatic clock interface for inversion-of-control

## installation

```
> npm install clock
```


## example usage

in JavaScript
```js
function announceTime(clock) {
  clock = clock || Date
  return 'It is now ' + clock.now()
}

announceTime()
// It is now 1499904588386

announceTime({now: function () { return 1234 }})
// It is now 1234
```

in TypeScript
```ts
import { Clock } from 'clock'

function announceTime(clock: Clock): string {
  clock = clock || Date
  return 'It is now ' + clock.now()
}
```

## `clock` is an interface package
A `Clock` is any object with a method `now()` which returns a timestamp
in milliseconds since the Unix epoch:

```ts
interface Clock {
  now (): number
}
```

The `Date` object satisfies the `Clock` interface.

This package will always be on the 1.x.x version range. Depend on this package
so that other people will know that your module expects a `Clock` interface.


## what problem this solves
Often in JavaScript, when we have code that needs to get the current time,
we'll do `Date.now()` or `new Date()`. This is easy and works great!

```js
function announceTime() {
  return 'It is now ' + Date.now()
}
```

However, this makes your code hard to test and difficult to predict,
because your return values depend on side-effects other than your arguments.
In functional programming terms, we no longer have [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency),
since multiple calls to `announceTime()` will have different outputs for the
same arguments.

What if we could **abstract over** the concept of time in our code?

With inversion of control, we can have our function ask someone else to
provide a way to get the time, and just advertise that we expect something
that lets us call `.now()` - either the default `Date` object, or anything
else with a method `now()`. And to make life easier, we can fall back to
the `Date` object by default.

```js
function announceTime(clock) {
  clock = clock || Date
  return 'It is now ' + clock.now()
}
```

Now that `clock` is a parameter, when we call `announceTime`, we can decide
what time it is:

```js
const constantTime = {now: () => 0 }
```

`constantTime` is a clock that will always return 0, the Unix epoch.

If we use that, multiple calls to `announceTime` will always return the same value:

```js
announceTime(constantTime)
// It is now 0
announceTime(constantTime)
// It is now 0
announceTime(constantTime)
// It is now 0
```

This means we can write a test:

```js
const assert = require('assert')

assert.equal('It is now 0', announceTime(constantTime))
```

Abstracting `clock`s is something common in other platforms, such as Java. See the [Java 8 Clock class](https://docs.oracle.com/javase/8/docs/api/java/time/Clock.html)
for an example. Other uses for abstract clocks include skew-corrected clocks,
simulating slowed down or sped up passage of time, and other fun tricks.

If you have a good example, analogy, or clearer way to express any of this
information, please open a GitHub issue or PR!

## api
This package includes some helpers:

### `systemClock : Clock` (default export)
A facade for `Date.now()`
JavaScript:
```js
const systemClock = require('clock')
systemClock.now()
// 1499907736846
```
TypeScript:
```ts
import { systemClock } from 'clock'
systemClock.now()
// 1499907736846
```

### `constantClock: (time: number = 0) => Clock`
Create a clock that always returns the same time. Useful for tests. The `time`
argument defaults to `0`, the Unix epoch.
JavaScript:
```js
const constantClock = require('clock').constantClock
const epochClock = constantClock()
epochClock.now()
// 0
epochClock.now()
// 0
```
TypeScript:
```ts
import { constantClock } from 'clock'
const epochClock = constantClock()
epochClock.now()
// 0
epochClock.now()
// 0
```

## contributing
This package is developed in TypeScript but usable in all JavaScript projects, on Node.js or in browsers.
The npm package includes compiled ES5 JavaScript, as well as TypeScript .d.ts type definition files.

Wanted: clarifications, example usage, translation of the readme into other human languages


## special thank you
to @medikoo for the package name. Repo for `clock<1.0.0` can be found at https://github.com/medikoo/clock. Thanks again!


## license
ISC


cheers!

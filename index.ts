export type milliseconds = number
export type seconds = number

export interface Clock {
  /**
   * Returns the timestamp in milliseconds since the Unix epoch
   *
   */
  now (): milliseconds
}

export function getSSE(clock: Clock) {
  return Math.round(clock.now() / 1000)
}

export const systemClock: Clock = {now: Date.now}
export default systemClock

export function constantClock(at: number = 0): Clock {
  return {
    now () { return at }
  }
}

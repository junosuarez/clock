export interface Clock {
  /**
   * Returns the timestamp in milliseconds since the Unix epoch
   *
   */
  now (): number
}

export const systemClock: Clock = {now: Date.now}
export default systemClock

export function constantClock(at: number = 0): Clock {
  return {
    now () { return at }
  }
}

export class WatchlistState {
  ids = $state([-1])
  constructor(initial: number[]){
    this.ids = initial
  }
  set(eventIds: number[]) {
    this.ids = eventIds;
  }
  add(eventId: number) {
    this.ids = [...this.ids, eventId]
  }
  remove(eventId: number) {
    const idx = this.ids.indexOf(eventId)
    if (idx > -1) {
      this.ids.splice(idx, 1)
    }
  }
  has(eventId: number) {
    const idx = this.ids.indexOf(eventId) 
    if (idx > -1) return true
    return false 
  }
  get() {
    return this.ids
  }
}
export const createWatchlist = (initial: number[]) => {
  return new WatchlistState(initial)
}

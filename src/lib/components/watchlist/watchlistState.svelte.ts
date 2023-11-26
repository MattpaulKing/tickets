export class WatchlistState {
  ids = $state<number[]>([])
  constructor(ids: number[]){
    this.ids = ids
  }
}
export const createWatchlist = (initial: number[]) => {
  return new WatchlistState(initial)
}


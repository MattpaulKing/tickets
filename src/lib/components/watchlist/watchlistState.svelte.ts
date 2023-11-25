export default function watchlistState(initial: number[]) {
  let watchlist = $state(initial)
  function add(eventId: number) {
    watchlist = [...watchlist, eventId]
  }
  function remove(eventId: number) {
    const idx = watchlist.indexOf(eventId)
    if (idx > -1) {
      watchlist.splice(idx, 1)
    }
  }
  function has(eventId: number) {
    const idx = watchlist.indexOf(eventId) 
    if (idx > -1) return true
    return false 
  }
  return {
   get watchlist() {
     return watchlist
   },
   add,
   remove,
   has
  }
}
export type WatchlistState = ReturnType<typeof watchlistState>

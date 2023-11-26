import type { PageServerLoad } from "./$types"
import { eventTypeAggs, newEventDetails, watchlist } from "$lib/queries"

export const ssr = false

export const load: PageServerLoad = async ({ locals }) => {
  return {
    eventTypeAggs: eventTypeAggs(locals),
    watchlist: watchlist(locals),
    streamed: {
      newEventDetails: newEventDetails(locals)
    }
  }
}

import type { PageServerLoad } from "./$types"
import { eventTypeAggs, newEventDetails } from "$lib/queries"

export const ssr = false

export const load: PageServerLoad = async ({ locals }) => {
  return {
    eventTypeAggs: eventTypeAggs(locals),
    streamed: {
      newEventDetails: newEventDetails(locals)
    }
  }
}

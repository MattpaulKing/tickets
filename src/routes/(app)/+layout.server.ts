import { watchlist } from '$lib/queries'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    session: await locals.getSession(),
    watchlist: watchlist(locals),
  }
}

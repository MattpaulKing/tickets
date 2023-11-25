import { watchlist } from "$lib/queries"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals, request, setHeaders }) => {
  if (!request.headers.has("cache-control")) {
    setHeaders({"cache-control": "max-age=360"})
  } 
  return {
    watchlist: watchlist(locals)
  }
}

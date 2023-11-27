import { fail, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { watchlistEvents } from "$lib/queries"

//TODO: Remove ssr false
export const ssr = false;

export const actions = {
  add: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData())
    const session  = await locals.getSession()
    const eventId = parseInt(data.eventId.toString())
    if (!eventId || !session) {
      return fail(400, { message: "Please try again" })
    } 
    const { error: err } = await locals.supabase.from("watchlist")
      .insert({eventId: eventId, userId: session?.user.id})

    if (err) {
      return fail(400, { message: "Please try again." })
    } 
    return { action: 'add' }
  },
  remove: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData())
    if (!data.eventId) {
      return fail(400, { message: "Please try again" })
    }

    const { error: err } = await locals.supabase.from("watchlist")
      .delete()
      .eq('eventId', data.eventId)
    if (err) {
      return fail(400, { message: "Please try again." })
    } 
    return { action: 'remove' }
  }
} satisfies Actions

export const load: PageServerLoad = async ({ locals }) => {
  return {
    watchlistEvents: watchlistEvents(locals)
  }
}

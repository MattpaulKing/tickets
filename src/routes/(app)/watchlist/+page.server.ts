import { fail, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const actions = {
  add: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData())
    const session  = await locals.getSession()
    if (!data.eventId || !session) return fail(400, { message: "Please try again" })
    const { error: err } = await locals.supabase.from("watchlist").insert({eventId: data.eventId, userId: session?.user.id})
    if (err) return fail(400, { message: "Please try again." })
    return { success: true }
  },
  remove: async ({ request, locals }) => {
    const data = await request.formData()
    const eventId = data.get("eventId")
    if (!eventId) return fail(400, { message: "Please try again" })
    const { error: err } = await locals.supabase.from("Watchlist")
      .delete()
      .eq('eventId', eventId)

    if (err) return fail(400, { message: "Please try again." })
    return { success: true }
  }
} satisfies Actions

export const load: PageServerLoad = async ({ locals }) => {

}

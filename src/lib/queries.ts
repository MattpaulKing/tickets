import { error } from "@sveltejs/kit"
import type { Functions, DbResult } from "$lib/types/db"
import { groupBy } from "./utils"

export const eventTypeAggs = async (locals: App.Locals) => {
  const { data, error: err } = await locals.supabase.rpc("event_type_aggs_by_month") as DbResult<Functions<"event_type_aggs_by_month">>
    if (err) {
        throw error(500, err)
    }
  return groupBy<Functions<"event_type_aggs_by_month">>(data, 'eventType')
}

export const newEventDetails = async (locals: App.Locals): Promise<Functions<"just_announced_by_type_details">> => {
  const { data, error: err } =
    await locals.supabase.rpc("just_announced_by_type_details") as DbResult<Functions<"just_announced_by_type_details">>
  if (err) {
    throw error(500, err)
  }
  return data
}

export const watchlist = async (locals: App.Locals) => {
  const query = await locals.supabase.from("watchlist").select("eventId")
  if (query.error) {
    throw error(500, "Watchlist couldn't be loaded, please try again")
  }
  return query.data.map(({ eventId }: { eventId: number }) => eventId)
}

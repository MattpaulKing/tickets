import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from "$lib/types/types" 

declare global {
  namespace App {
	  interface Locals {
	  	supabase: SupabaseClient<Database>
	  	getSession(): Promise<Session | null>
	  	pathname: string
	    }
    interface PageData {
      session: Session | null
    }
	  // interface Error {}
	  // interface Platform {}
  }
}

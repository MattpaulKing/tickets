import { fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"
import { AuthApiError } from "@supabase/supabase-js"

export const actions = {
  signin: async ({ request, locals }) => {
    const data = Object.fromEntries(await request.formData()) as { email: string; password: string; pathAttempted: string }
      const { data: userAuthInfo, error: err } = await locals.supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      data.password = ''
      if (err) {
        if (err instanceof AuthApiError && err.status === 400) {
          if (err.message === 'Email not confirmed') {
            return fail(403, { email: data.email })
          }
        } else if (userAuthInfo.user === null) {
            return fail(403, { email: data.email })
      }
    }
    //NOTE: Can only get urls from own site through origin redirecting to login
    throw redirect(302, data.pathAttempted)
  } 
} satisfies Actions

export const load: PageServerLoad = async ({ url, locals }: { url: URL, locals: App.Locals }) => {
  const session = await locals.getSession() 
  if (session) {
    throw redirect(303, '/')
  }
  return { url: url.origin }
}

import { auth } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  //1
  event.locals.user = auth(event);
  const response = await resolve(event); //2
  //3

  return response;
};

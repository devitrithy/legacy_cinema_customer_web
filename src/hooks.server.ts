import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { auth } from "$lib/auth";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  //1
  event.locals.user = auth(event);
  const response = await resolve(event); //2
  //3

  return response;
};

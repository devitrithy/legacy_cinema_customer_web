import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ locals }) => {
  const booked = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/`);
  };
  return {};
}) satisfies PageLoad;

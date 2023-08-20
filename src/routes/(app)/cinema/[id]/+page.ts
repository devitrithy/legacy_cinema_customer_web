import {
  PUBLIC_API_ENDPOINT,
  PUBLIC_SECRET_GUEST_KEY,
} from "$env/static/public";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const locations = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/location/${params.id}`, {
      headers: { Authorization: `Bearer ${PUBLIC_SECRET_GUEST_KEY}` },
    });
    return res.json();
  };
  return { location: locations() };
}) satisfies PageLoad;

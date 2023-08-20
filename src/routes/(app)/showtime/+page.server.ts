import {
  PUBLIC_API_ENDPOINT,
  PUBLIC_SECRET_GUEST_KEY,
} from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
  const cinemaID = url.searchParams.get("cinema");
  const date =
    url.searchParams.get("date") || new Date().toISOString().substring(8, 10);
  let cinema;

  if (cinemaID) {
    cinema = async () => {
      const res = await fetch(
        `${PUBLIC_API_ENDPOINT}/movie?cinema=${cinemaID}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${PUBLIC_SECRET_GUEST_KEY}`,
          },
        }
      );
      return res.json();
    };
  } else {
    cinema = async () => {
      const res = await fetch(
        `${PUBLIC_API_ENDPOINT}/movie?include=1&date=${date}`,
        {
          headers: { Authorization: `Bearer ${PUBLIC_SECRET_GUEST_KEY}` },
        }
      );
      return res.json();
    };
  }
  return { movie: cinema() };
}) satisfies PageServerLoad;

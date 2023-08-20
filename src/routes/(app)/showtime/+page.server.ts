import {
  PUBLIC_API_ENDPOINT,
  PUBLIC_SECRET_GUEST_KEY,
} from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import axios from "axios";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ url, cookies }) => {
  const cinemaID = url.searchParams.get("cinema");
  const date =
    url.searchParams.get("date") || new Date().toISOString().substring(8, 10);
  let cinema;

  if (cinemaID) {
    cinema = await fetch(
      `${PUBLIC_API_ENDPOINT}/movie?cinema=${cinemaID}&date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${PUBLIC_SECRET_GUEST_KEY}`,
        },
      }
    );
  } else {
    cinema = await fetch(
      `${PUBLIC_API_ENDPOINT}/movie?include=1&date=${date}`,
      {
        headers: { Authorization: `Bearer ${PUBLIC_SECRET_GUEST_KEY}` },
      }
    );
  }
  return { movie: cinema.json(), token: cookies.get("token") };
}) satisfies PageServerLoad;

export const actions: Actions = {
  pay: async ({ request, params, cookies, locals, url }) => {
    const p = await request.formData();
    const seat = p.get("pay");
    let seats = seat?.toString().split(",");
    console.log(p.get("price_id"));
    let items = [
      {
        genre: p.get("genre"),
        origin: url.origin,
        day: p.get("date") || new Date().getDate(),
        uid: locals.user?.user_id,
        mid: p.get("mid"),
        seats: p.get("pay"),
        sid: p.get("sid"),
        id: p.get("price_id"),
        title: p.get("title"),
        qty: seats?.length,
        price: p.get("price"),
      },
    ];
    await axios
      .post(
        `${PUBLIC_API_ENDPOINT}/stripe/checkout`,
        {
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((data) => {
        throw redirect(303, data.data.url);
      })
      .catch((err) => {
        if (err.status !== 303) {
          throw redirect(303, "/login");
        } else {
          throw redirect(303, err.location);
        }
      });
  },
};

import { NODE_ENV } from "$env/static/private";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import axios from "axios";
import type { PageServerLoad } from "./$types";
import { error, type Actions, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, url }) => {
  const customHeaders = {
    Authorization: "Bearer guest",
  };
  let id = params.id;
  const movie = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/movie/` + id, {
      headers: customHeaders,
    });
    if (res.status === 404) {
      throw error(404, { message: "Movie not found" });
    }
    return res.json();
  };
  let date;
  if (NODE_ENV === "development") {
    date = url.searchParams.get("day") || new Date().getDate();
  } else {
    date = url.searchParams.get("day") || new Date().getDate() + 1;
  }
  if (
    Number(date) < Number(new Date().getDate()) &&
    Number(date) > Number(new Date().getDate() + 2)
  ) {
    //
    date = new Date().getDate();
  }

  const location = async () => {
    const res = await fetch(
      `${PUBLIC_API_ENDPOINT}/showing/now/${id}?day=${date}`,
      {
        headers: customHeaders,
      }
    );
    if (res.status === 404) {
      throw error(404, { message: "Movie not found" });
    }
    return res.json();
  };

  return {
    movie: movie(),
    locations: location(),
  };
};

export const actions: Actions = {
  pay: async ({ request, params, url }) => {
    const p = await request.formData();
    const seat = p.get("pay");
    let seats = seat?.toString().split(",");
    let items = [
      {
        day: url.searchParams.get("day") || new Date().getDate(),
        mid: params.id,
        seats: p.get("pay"),
        sid: p.get("sid"),
        id: "price_1NeUShLmuduO7w8mjnb65Xlh",
        title: p.get("title"),
        qty: seats?.length,
        price: p.get("price"),
      },
    ];
    await axios
      .post(`${PUBLIC_API_ENDPOINT}/stripe/checkout`, {
        items,
      })
      .then((data) => {
        throw redirect(303, data.data.url);
      });
  },
};

export const prerender = true;
import { NODE_ENV } from "$env/static/private";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import axios from "axios";
import type { PageServerLoad } from "./$types";
import { error, type Actions, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({
  params,
  url,
  cookies,
  locals,
}) => {
  const customHeaders = {
    Authorization: "Bearer guest",
  };
  const token = cookies.get("token");
  console.log(locals.payment);
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
    date = url.searchParams.get("day") || new Date().getDate();
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
    token: token,
    movie: movie(),
    locations: location(),
  };
};

export const actions: Actions = {
  pay: async ({ request, params, cookies, locals }) => {
    const p = await request.formData();
    const seat = p.get("pay");
    let seats = seat?.toString().split(",");
    let items = [
      {
        day: p.get("date") || new Date().getDate(),
        uid: locals.user?.user_id,
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

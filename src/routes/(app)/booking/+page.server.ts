export const prerender = true;
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, cookies }) => {
  const token = cookies.get("token");
  const booked = async () => {
    const res = await fetch(
      `${PUBLIC_API_ENDPOINT}/ticket/booking/${locals.user?.user_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.json();
  };
  return { booking: booked() };
};

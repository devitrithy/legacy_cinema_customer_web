export const prerender = true;
import {
  PUBLIC_API_ENDPOINT,
  PUBLIC_SECRET_GUEST_KEY,
} from "$env/static/public";
import type { PageLoad } from "../$types";

export const load: PageLoad = async () => {
  const data = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/location`, {
      headers: {
        Authorization: `Bearer ${PUBLIC_SECRET_GUEST_KEY}`,
      },
    });
    return res.json();
  };
  return { cinemas: data() };
};

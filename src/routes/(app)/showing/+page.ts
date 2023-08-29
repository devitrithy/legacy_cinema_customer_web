import {
  PUBLIC_API_ENDPOINT,
  PUBLIC_SECRET_GUEST_KEY,
} from "$env/static/public";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ setHeaders }) => {
  const movie = async () => {
    const data = await fetch(`${PUBLIC_API_ENDPOINT}/movie/now`, {
      headers: { Authorization: `Bearer ${PUBLIC_SECRET_GUEST_KEY}` },
    });
    const cache = data.headers.get("cache-control");
    if (cache) {
      setHeaders({ "cache-control": cache });
    }
    return data.json();
  };
  return { data: movie() };
};

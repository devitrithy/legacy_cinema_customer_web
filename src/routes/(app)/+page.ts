import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ setHeaders }) => {
  const movie = async () => {
    const data = await fetch(`${PUBLIC_API_ENDPOINT}/movie`, {
      headers: { Authorization: "Bearer guest" },
    });
    const cache = data.headers.get("cache-control");
    if (cache) {
      setHeaders({ "cache-control": cache });
    }
    return data.json();
  };
  return { data: movie() };
};

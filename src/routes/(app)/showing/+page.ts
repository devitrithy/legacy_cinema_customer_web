import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ setHeaders }) => {
  const movie = async () => {
    const data = await fetch(`${PUBLIC_API_ENDPOINT}/movie`, {
      headers: { Authorization: "Bearer guest" },
    });
    if (data.headers.get("Cache-Control")) {
      setHeaders({ "Cache-Control": "max=3600" });
    }
    return data.json();
  };
  return { data: movie() };
};

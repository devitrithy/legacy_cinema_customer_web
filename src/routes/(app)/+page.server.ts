import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const movie = async () => {
    const data = await fetch(`${PUBLIC_API_ENDPOINT}/movie`, {
      headers: { Authorization: "Bearer guest" },
    });
    return data.json();
  };
  return { data: movie() };
};

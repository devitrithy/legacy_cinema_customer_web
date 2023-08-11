import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ url, setHeaders }) => {
  const customHeaders = {
    Authorization: "Bearer guest",
  };
  try {
    const data = async () => {
      const data = await fetch(`${PUBLIC_API_ENDPOINT}/slideshow`, {
        headers: customHeaders,
      });
      return data.json();
    };
    return { data: data() };
  } catch (error) {}
};

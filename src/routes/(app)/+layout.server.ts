import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, setHeaders, locals }) => {
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
    return { data: data(), user: locals.user };
  } catch (error) {}
};

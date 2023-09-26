import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const customHeaders = {
    Authorization: "Bearer guest",
  };
  try {
    const data = await fetch(`${PUBLIC_API_ENDPOINT}/slideshow`, {
      headers: customHeaders,
    });
    return { data: data.json(), user: locals.user };
  } catch (error) {
    console.error(error);
  }
};

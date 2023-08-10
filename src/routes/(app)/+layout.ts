import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ setHeaders }) => {
  const customHeaders = {
    Authorization: "Bearer guest",
  };
  const data = async () => {
    const data = await fetch(`${PUBLIC_API_ENDPOINT}/slideshow`, {
      headers: customHeaders,
    });
    console.log(data.headers.get("slideshow-cache"));

    return data.json();
  };
  console.log(data());
  return { data: data() };
};

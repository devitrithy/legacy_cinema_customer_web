import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ url, setHeaders }) => {
  const customHeaders = {
    Authorization: "Bearer guest",
  };
  try {
    if (url.pathname === "/") {
      const data = async () => {
        const data = await fetch(`${PUBLIC_API_ENDPOINT}/slideshow`, {
          headers: customHeaders,
        });
        if (data.headers.get("Cache-Control") && url.pathname === "/") {
          setHeaders({ "Cache-Control": "max=3600" });
        }
        return data.json();
      };
      return { data: data() };
    }
  } catch (error) {}
};

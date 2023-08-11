import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
  const customHeaders = {
    Authorization: "Bearer guest",
  };
  let id = params.id;
  const data = async () => {
    const res = await fetch(`${PUBLIC_API_ENDPOINT}/movie/` + id, {
      headers: customHeaders,
    });
    if (data.status === 404) {
      console.log("error loading");
      throw error(404, { message: "Movie not found" });
    }
    return res.json();
  };

  return {
    data: data(),
  };
};

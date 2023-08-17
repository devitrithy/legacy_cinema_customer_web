import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { error, type Actions, fail } from "@sveltejs/kit";
import axios from "axios";

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    try {
      const res = await axios.post(`${PUBLIC_API_ENDPOINT}/user`, data);
      if (res.status === 201) {
        return;
      }
    } catch (err) {
      console.log(err.response.status);
      throw fail(409, { message: err.data.message });
    }
  },
};

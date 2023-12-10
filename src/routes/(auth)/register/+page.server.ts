import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { fail, type Actions } from "@sveltejs/kit";
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
      //console.log(err);
      return fail(err.response.status, { message: err.data.message });
    }
  },
};

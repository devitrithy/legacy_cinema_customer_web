import { writable } from "svelte/store";

export const auth = writable({
  user_id: "",
  profile: "",
  username: "",
  email: "",
  firstname: "",
  lastname: "",
});

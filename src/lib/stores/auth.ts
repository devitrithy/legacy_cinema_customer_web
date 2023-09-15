import { writable } from "svelte/store";

export const auth = writable({
  user_id: "" || undefined,
  profile: "" || undefined,
  username: "" || undefined,
  email: "" || undefined,
  firstname: "" || undefined,
  lastname: "" || undefined,
});

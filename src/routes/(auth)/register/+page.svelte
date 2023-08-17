<script lang="ts">
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import {
    Button,
    Checkbox,
    DarkMode,
    Fileupload,
    Label,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import TextBox from "$lib/ui/textBox.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  let iMessage = "";

  export let data: PageData;
  let u = {
    input: "",
    result: 0,
    message: "",
  };
  let p = {
    input: "",
    result: 0,
    message: "",
  };
  let cp = {
    input: "",
    result: 0,
    message: "",
  };
  let fn = {
    input: "",
    result: 0,
    message: "",
  };
  let ln = {
    input: "",
    result: 0,
    message: "",
  };
  let em = {
    input: "",
    result: 0,
    message: "",
  };
  const checkLength = (text: FormDataEntryValue, name: String) => {
    if (text.length < 1) {
      return { message: `Please input the ${name}!`, result: 2 };
    } else {
      return { message: `Validated ${name}`, result: 1 };
    }
  };
  let hide = true;
  const login: SubmitFunction = ({ form, data, cancel, action }) => {
    const { username, password, firstname, lastname, email, confirmPassword } =
      Object.fromEntries(data);

    console.log(firstname);
    p.message = checkLength(password, "Password").message;
    p.result = checkLength(password, "Password").result;
    cp.message = checkLength(confirmPassword, "Confirm Password").message;
    cp.result = checkLength(confirmPassword, "Confirm Password").result;
    u.message = checkLength(username, "Username").message;
    u.result = checkLength(username, "Username").result;
    em.message = checkLength(email, "Email").message;
    em.result = checkLength(email, "Email").result;
    fn.message = checkLength(firstname, "Firstname").message;
    fn.result = checkLength(firstname, "Firstname").result;
    ln.message = checkLength(lastname, "Lastname").message;
    ln.result = checkLength(lastname, "Lastname").result;
    if (
      p.result === 2 ||
      cp.result === 2 ||
      u.result === 2 ||
      em.result === 2 ||
      fn.result === 2 ||
      ln.result === 2
    ) {
      cancel();
    }
    if (password !== confirmPassword) {
      cp.result = 2;
      cp.message = "Password don't match";
      cancel();
    }

    return async ({ result, update }) => {
      console.log(result.status);
      switch (result.type) {
        case "success":
          if ($page.url.searchParams.get("r")) {
            const r = $page.url.searchParams.get("r") || "/";
            console.log(r);
            goto(`/${r.slice(1)}`);
          } else {
            goto("/login");
          }
          break;
        case "failure":
          console.log(result.status);
          break;

        default:
          break;
      }
    };
  };
</script>

<div class="hidden">
  <DarkMode />
</div>

<title>Legacy Cinema | Sign Up</title>

<main class="text-white flex justify-center items-center h-full w-full">
  <form
    use:enhance={login}
    class="bg-slate-900 p-10 rounded-md w-[500px] grid gap-5"
    method="post"
  >
    <div class="flex justify-between items-center">
      <img
        src={`${PUBLIC_API_ENDPOINT}/thumbnail/logo.jpg?h=50&w=100`}
        alt=""
        srcset=""
      />
      <p class="uppercase font-bold">Register</p>
    </div>
    <div class="grid grid-flow-col gap-5">
      <TextBox
        bind:value={fn.input}
        label="Firstname"
        message={fn.message}
        name="firstname"
        type="text"
        success={fn.result}
      />
      <TextBox
        bind:value={ln.input}
        label="Lastname"
        message={ln.message}
        name="lastname"
        type="text"
        success={ln.result}
      />
    </div>
    <TextBox
      bind:value={em.input}
      label="Email"
      message={em.message}
      name="email"
      type="email"
      success={em.result}
    />
    <TextBox
      bind:value={u.input}
      label="Username"
      message={u.message}
      name="username"
      type="text"
      success={u.result}
    />
    <div class="grid grid-flow-col gap-5">
      <TextBox
        bind:value={p.input}
        label="Password"
        message={p.message}
        name="password"
        type={hide ? "password" : "text"}
        success={p.result}
      />
      <TextBox
        bind:value={cp.input}
        label="Confirm Password"
        message={cp.message}
        name="confirmPassword"
        type={hide ? "password" : "text"}
        success={cp.result}
      />
    </div>
    <Fileupload name="profile" accept="image/jpeg" />
    {#if iMessage !== ""}
      <small class="text-red-700">{iMessage}</small>
    {/if}
    <Button type="submit">Sign Up</Button>
    <p class="text-center">
      Already have account? <a href="/login" class="text-primary-700">Sign In</a
      >
    </p>
  </form>
</main>

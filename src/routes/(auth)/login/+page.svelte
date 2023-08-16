<script lang="ts">
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import {
    Button,
    DarkMode,
    FloatingLabelInput,
    Helper,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import TextBox from "$lib/ui/textBox.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  let iMessage = "";

  export let data: PageData;
  let inputText = {
    username: "",
    password: "",
    pMessage: "",
    pResult: 0,
    uMessage: "",
    uResult: 0,
  };
  let hide = true;
  const login: SubmitFunction = ({ form, data, cancel, action }) => {
    const { username, password } = Object.fromEntries(data);
    console.log(password);
    if (password.length < 1) {
      inputText.pMessage = "Please input the password";
      inputText.pResult = 2;
      cancel();
    } else {
      inputText.pMessage = "Password Validated";
      inputText.pResult = 1;
    }
    if (password.length < 1) {
      inputText.uMessage = "Please input the password";
      inputText.uResult = 2;
      cancel();
    } else {
      inputText.uMessage = "Username Validated";
      inputText.uResult = 1;
    }

    return async ({ result, update }) => {
      console.log(result.type);
      switch (result.type) {
        case "success":
          if ($page.url.searchParams.get("r")) {
            const r = $page.url.searchParams.get("r") || "/";
            console.log(r);
            goto(`/${r.slice(1)}`);
          } else {
            goto("/");
          }
          break;
        case "error":
          inputText.uResult = 2;
          inputText.pResult = 2;
          inputText.pMessage = "";
          inputText.uMessage = "";
          iMessage = "Please check your username and password again!";
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

<title>Legacy Cinema | Login</title>

<main class="text-white flex justify-center items-center h-full w-full">
  <form
    use:enhance={login}
    class="bg-slate-900 p-10 rounded-md w-[500px] grid gap-5"
    action="?/login"
    method="post"
  >
    <div class="flex justify-between items-center">
      <img
        src={`${PUBLIC_API_ENDPOINT}/thumbnail/logo.jpg?h=50&w=100`}
        alt=""
        srcset=""
      />
      <p class="uppercase font-bold">Login</p>
    </div>
    <TextBox
      bind:value={inputText.username}
      label="Username"
      message={inputText.uMessage}
      name="username"
      type="text"
      success={inputText.uResult}
    />
    <TextBox
      bind:value={inputText.password}
      label="Password"
      message={inputText.pMessage}
      name="password"
      type={hide ? "password" : "text"}
      success={inputText.pResult}
    />
    {#if iMessage !== ""}
      <small class="text-red-700">{iMessage}</small>
    {/if}
    <Button type="submit">Login</Button>
  </form>
</main>

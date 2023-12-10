<script lang="ts">
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import {
    Button,
    DarkMode,
    Fileupload,
    Modal,
    Spinner,
    Toggle,
  } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import TextBox from "$lib/ui/textBox.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import axios from "axios";
  let iMessage = "";
  let loading = false;
  let show = false;

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
  //TODO: Make sure that email and username not duplicate
  const login: SubmitFunction = async ({ form, data, cancel, action }) => {
    const { username, password, firstname, lastname, email, confirmPassword } =
      Object.fromEntries(data);

    loading = true;
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
      loading = false;
      cancel();
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password.toString())) {
      p.result = 2;
      p.message = "Password is not string engough!";
      loading = false;
      cancel();
    } else {
      if (password !== confirmPassword) {
        cp.result = 2;
        cp.message = "Password don't match";
        loading = false;
        cancel();
      }
    }
    await axios
      .get(`${PUBLIC_API_ENDPOINT}/user/email/${email}`)
      .then((res) => {
        //console.log(res.data);
        if (res.data.available === 1) {
          em.result = 2;
          em.message = "Email already exist! Plaese try another one.";
          loading = false;
          cancel();
        }
      });
    await axios
      .get(`${PUBLIC_API_ENDPOINT}/user/username/${username}`)
      .then((res) => {
        //console.log(res.data);
        if (res.data.available === 1) {
          u.result = 2;
          u.message = "Username already exist! Plaese try another one.";
          loading = false;
          cancel();
        }
      });

    return async ({ result }) => {
      loading = false;
      //console.log(result.status);
      switch (result.type) {
        case "success":
          if ($page.url.searchParams.get("r")) {
            const r = $page.url.searchParams.get("r") || "/";
            //console.log(r);
            goto(`/${r.slice(1)}`);
          } else {
            goto("/login");
          }
          break;
        case "failure":
          loading = false;
          //console.log(result.status);
          break;

        default:
          loading = false;
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
    <Toggle
      checked={!hide}
      on:click={() => {
        hide = !hide;
      }}>Show Password</Toggle
    >

    <Fileupload name="profile" accept="image/jpeg" />
    {#if iMessage !== ""}
      <small class="text-red-700">{iMessage}</small>
    {/if}
    {#if loading}
      <Button type="submit"><Spinner color="gray" size="6" /></Button>
    {:else}
      <Button type="submit">Sign Up</Button>
    {/if}
    <p class="text-center">
      Already have account? <a href="/login" class="text-primary-700">Sign In</a
      >
    </p>
  </form>
</main>

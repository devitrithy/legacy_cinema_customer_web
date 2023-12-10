<script>
  import { page } from "$app/stores";
  import internal from "./website-maintenance.gif";
  import e from "./security-research.gif";
  import { DarkMode } from "flowbite-svelte";
  import {
    FacebookSolid,
    PapperPlaneSolid,
    PhoneSolid,
  } from "flowbite-svelte-icons";
</script>

<title>Legacy Cinema | Error {$page.status}</title>
<div style="display: none;">
  <DarkMode />
</div>
<div
  class="flex flex-col gap-4 items-center justify-center text-black dark:text-white"
>
  <div id="main">
    <div class="fof">
      <p class="mb-5 flex flex-col justify-center items-center">
        {#if $page.status === 500}
          <img src={internal} alt="this slowpoke moves" width="550" />
          <span class="text-3xl"> Server is undermaintained. </span>
          Please make sure contact me through
          <div class="flex mt-10 gap-5">
            <a
              href="tel:+8558124798"
              title="Phone Number"
              class="border border-stone-50 p-3 rounded-full"><PhoneSolid /></a
            >
            <a
              class="border border-stone-50 p-3 rounded-full"
              title="Facebook"
              href="https://web.facebook.com/deviiiixD/"
              target="_blank"
              rel="noopener noreferrer"><FacebookSolid /></a
            >
            <a
              class="border border-stone-50 p-3 rounded-full"
              title="Telegram"
              href="https://t.me/+855884124798"
              target="_blank"
              rel="noopener noreferrer"><PapperPlaneSolid /></a
            >
          </div>
        {:else}
          <img src={e} alt="this slowpoke moves" width="550" />
          <span class="text-3xl">
            {$page.status}
            {$page.error?.message}
          </span>
          <a href="/" class="underline">Click here to go to home page</a>
        {/if}
      </p>
    </div>
  </div>
</div>

<style>
  #main {
    display: table;
    width: 100%;
    height: 90vh;
    text-align: center;
  }

  .fof {
    display: table-cell;
    vertical-align: middle;
  }

  .fof h1 {
    font-size: 50px;
    display: inline-block;
    padding-right: 12px;
    animation: type 0.5s alternate infinite;
  }

  @keyframes type {
    from {
      box-shadow: inset -3px 0px 0px #888;
    }
    to {
      box-shadow: inset -3px 0px 0px transparent;
    }
  }
</style>

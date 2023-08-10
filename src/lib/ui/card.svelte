<script lang="ts">
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { Tooltip } from "flowbite-svelte";
  import play from "./play.png";

  const endpoint = PUBLIC_API_ENDPOINT;
  export let url = `no-image.png`;
</script>

<Tooltip triggeredBy="#hover" class="z-50">Play Trailer</Tooltip>
<div class="group w-[300px] hover:bg-black relative h-[430px] shadow-md">
  <img
    src={`${endpoint}/thumbnail/${url}?w=300&h=450`}
    alt=""
    class="absolute group-hover:brightness-50 group-hover:blur-[1px] transition"
  />
  <button id="hover" class="absolute text-2xl hidden group-hover:block m-10">
    <img src={play} alt="button" width="50" srcset="" />
  </button>

  <button
    class="absolute bottom-11 left-0 right-0 hidden group-hover:block bg-black uppercase py-2 opacity-95"
    >info</button
  >
  <button
    class="absolute bottom-24 left-0 right-0 hidden group-hover:block bg-red-950 uppercase py-2 opacity-95"
    >Booking</button
  >
</div>

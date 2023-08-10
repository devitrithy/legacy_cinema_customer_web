<script lang="ts">
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { Modal, Tooltip } from "flowbite-svelte";
  import play from "./play.png";
  import Embed from "./embed.svelte";

  const endpoint = PUBLIC_API_ENDPOINT;
  export let id;
  export let url = `no-image.png`;
  let popupModal = false;
  export let trailerLink;
  let trialerVideo;

  const playTrailer = (trailer: String) => {
    popupModal = true;
    trialerVideo = trailer;
  };
</script>

<Tooltip triggeredBy={`#hover${id}`} class="z-50">Play Trailer</Tooltip>
<div class="group w-[300px] hover:bg-black relative h-[430px] shadow-md">
  <img
    src={`${endpoint}/thumbnail/${url}?w=300&h=450`}
    alt=""
    class="absolute group-hover:brightness-50 group-hover:blur-[1px] transition"
  />
  <button
    on:click={() => {
      playTrailer(trailerLink);
    }}
    id={`hover${id}`}
    class="absolute text-2xl hidden group-hover:block m-10"
  >
    <img src={play} alt="button" width="50" srcset="" />
  </button>

  <button
    class="absolute bottom-11 left-0 right-0 hidden group-hover:block bg-stone-950 uppercase py-2 opacity-95 hover:opacity-100 hover:bg-stone-900"
    >info</button
  >
  <button
    class="absolute bottom-24 left-0 right-0 hidden group-hover:block bg-red-950 uppercase py-2 opacity-95 hover:opacity-100 hover:bg-red-900"
    >Booking</button
  >
</div>

<Modal bind:open={popupModal} autoclose size="lg" outsideclose>
  <div class="flex justify-center items-center">
    <Embed width="770" height="400" url={trialerVideo} />
  </div>
</Modal>

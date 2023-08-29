<script lang="ts">
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { CalendarMonthOutline, ClockOutline } from "flowbite-svelte-icons";
  import play from "./play.png";
  import EmbedModal from "./embedModal.svelte";

  const endpoint = PUBLIC_API_ENDPOINT;
  export let id: String;
  export let url = `no-image.png`;
  let popupModal = false;
  export let trailerLink: String;
  let trialerVideo: String;
  export let title;
  export let duration;
  export let release;
  export let commingSoon = false;

  const playTrailer = (trailer: String) => {
    popupModal = true;
    trialerVideo = trailer;
  };
</script>

<div class="group w-[300px] hover:bg-black relative h-[430px] shadow-md">
  <img
    src={`${endpoint}/thumbnail/${url}?w=300&h=450`}
    alt=""
    loading="lazy"
    class="absolute group-hover:brightness-50 group-hover:blur-[1px] transition"
  />
  <div class="absolute w-full h-[400px] my-5">
    <div class="flex flex-col w-full h-full justify-between">
      <button
        on:click={() => {
          playTrailer(trailerLink);
        }}
        id={`hover${id}`}
        class=" text-2xl hidden group-hover:block m-5"
      >
        <img src={play} alt="button" width="80" srcset="" />
      </button>
      <div class="group-hover:block hidden m-5 gap-3">
        <div class="flex gap-3 flex-col">
          <p class="font-bold uppercase text-2xl">{title}</p>
          <p class="flex gap-3 items-center">
            <span>
              <ClockOutline />
            </span>{duration}
          </p>
          <p class="flex items-center gap-3">
            <span><CalendarMonthOutline /></span>
            {release}
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-2 mx-3 justify-between">
        <a
          href={`/showing/${id}`}
          class=" bottom-11 left-0 right-0 hidden group-hover:block border rounded-md uppercase py-2 opacity-95 hover:opacity-100 hover:bg-white hover:text-black w-full text-center"
          >info</a
        >
        {#if !commingSoon}
          <a
            href={`/showing/${id}?booking=1`}
            class=" bottom-24 left-0 right-0 hidden group-hover:block bg-red-950 uppercase py-2 opacity-95 hover:opacity-100 rounded-md hover:bg-red-900 w-full text-center"
            >Booking</a
          >
        {/if}
      </div>
    </div>
  </div>
</div>

<button on:click={() => (popupModal = false)}>
  <EmbedModal {popupModal} {trialerVideo} />
</button>

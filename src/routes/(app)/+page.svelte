<script>
  import play from "../../lib/ui/play.png";
  export let data;
  let movies = data.data.movies;
  let trailer = [];
  let commings = [];
  import Card from "$lib/ui/card.svelte";
  import { EmbedModal } from "$lib";
  for (let i = 0; i < 10; i++) {
    trailer.push(movies[i + 6].trailer);
  }
  for (let i = 0; i < 5; i++) {
    commings.push(movies[i + 10]);
  }
  let popupModal = false;
  let trialerVideo = "";
  const embedModal = (vid) => {
    popupModal = true;
    trialerVideo = vid;
  };
</script>

<title>Legacy Cinema | Home</title>
<h1 class="uppercase text-3xl text-black dark:text-white font-bold my-10">
  new trailer
</h1>
<div class="grid grid-flow-col gap-5 overflow-x-auto" id="style-1">
  {#each trailer as movie}
    <div
      class="relative w-[300px] h-200"
      on:click={() => {
        embedModal(movie);
      }}
    >
      <button class="absolute mr-[110px] top-0 right-0 bottom-0">
        <img src={play} alt="" width="65" />
      </button>
      <img
        src={`https://img.youtube.com/vi/${movie}/hqdefault.jpg`}
        alt=""
        srcset=""
      />
    </div>
  {/each}
</div>

<h1 class="uppercase text-3xl text-black dark:text-white font-bold my-10">
  comming soon
</h1>
<div class="grid grid-flow-col gap-5 overflow-x-auto h-[460px]" id="style-1">
  {#each commings as movie}
    <Card
      url={movie.poster.substring(8)}
      trailerLink={movie.trailer}
      id={movie.movie_id}
    />
  {/each}
</div>

<h1 class="uppercase text-3xl text-black dark:text-white font-bold my-10">
  Now Showing
</h1>
<div
  class="grid grid-flow-col gap-5 overflow-x-auto h-[460px] mb-20"
  id="style-1"
>
  {#each movies as movie}
    <Card
      url={movie.poster.substring(8)}
      trailerLink={movie.trailer}
      id={movie.movie_id}
    />
  {/each}
</div>
<div on:click={() => (popupModal = false)}>
  <EmbedModal {popupModal} {trialerVideo} />
</div>

<style>
  #style-1::-webkit-scrollbar {
    height: 10px;
    width: 2px;
    @apply bg-slate-900;
  }

  #style-1::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #7e7e7e;
  }
</style>

<script>
  export let data;
  let movies = data.data.movies;
  let trailer = [];
  let commings = [];
  import Card from "$lib/ui/card.svelte";
  import Embed from "$lib/ui/embed.svelte";
  console.log(movies);
  for (let i = 0; i < 10; i++) {
    trailer.push(movies[i + 6].trailer);
  }
  for (let i = 0; i < 7; i++) {
    commings.push(movies[i + 10]);
  }
</script>

<h1 class="uppercase text-3xl text-black dark:text-white font-bold my-10">
  new trailer
</h1>
<div class="flex gap-5 overflow-auto w-full" id="style-1">
  {#each trailer as movie}
    <Embed url={movie} width="300" height="200" />
  {/each}
</div>

<h1 class="uppercase text-3xl text-black dark:text-white font-bold my-10">
  comming soon
</h1>
<div class="grid grid-flow-col gap-5 overflow-x-auto h-[460px]" id="style-1">
  {#each commings as movie}
    <Card url={movie.poster.substring(8)} />
  {/each}
</div>

<h1 class="uppercase text-3xl text-black dark:text-white font-bold my-10">
  Now Showing
</h1>
<div class="grid grid-flow-col gap-5 overflow-x-auto h-[460px]" id="style-1">
  {#each movies as movie}
    <Card url={movie.poster.substring(8)} />
  {/each}
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

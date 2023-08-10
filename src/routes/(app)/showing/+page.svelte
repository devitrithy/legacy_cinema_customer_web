<script lang="ts">
  import Card from "$lib/ui/card.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let movies = data.data.movies;
</script>

<h1 class="my-5 uppercase text-3xl font-bold">Now Showing</h1>
<div
  class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 2xl:grid-cols-5 gap-10 mb-20 justify-items-center"
>
  {#each movies as movie}
    <Card url={movie.poster.substring(8)} trailerLink={movie.trailer} />
  {/each}
</div>

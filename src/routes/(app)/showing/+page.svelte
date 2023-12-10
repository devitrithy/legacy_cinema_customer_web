<script lang="ts">
  import Card from "$lib/ui/card.svelte";
  import moment from "moment-timezone";
  import type { PageData } from "./$types";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";
  import { Search, Button } from "flowbite-svelte";

  export let data: PageData;
  let movies = data.data;

  let searchMovie = movies.map((c: any) => ({
    ...c,
    searchTerms: `${c.title} ${c.time} ${c.genre} ${moment(c.create_at)
      .tz("Atlantic/Reykjavik")
      .format("LL")}`,
  }));

  const searchStore = createSearchStore(searchMovie);

  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  onDestroy(() => {
    unsubscribe();
  });
</script>

<title>Legacy Cinema | Now Showing</title>
<div class="flex justify-between">
  <h1 class="mb-12 text-center uppercase font-bold text-xl">Now Showing</h1>
  <div>
    <Search size="md" bind:value={$searchStore.search} />
  </div>
</div>

<div
  class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 2xl:grid-cols-5 gap-10 mb-20 justify-items-center"
>
  {#each $searchStore.filtered as movie}
    <div class="mb-5">
      <Card
        url={movie.poster.substring(8)}
        trailerLink={movie.trailer}
        title={movie.title}
        duration={`${movie.time} Minutes`}
        release={moment(movie.create_at).tz("Atlantic/Reykjavik").format("LL")}
        id={movie.movie_id}
      />
    </div>
  {/each}
</div>

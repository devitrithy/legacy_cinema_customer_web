<script lang="ts">
  import { Button, Search } from "flowbite-svelte";
  import src from "../../../public/cinemas.webp";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";
  export let data;
  let { cinemas } = data;
  let searchCinemas = cinemas.locations.map((c: any) => ({
    ...c,
    searchTerms: `${c.location_name} ${c.address}`,
  }));

  const searchStore = createSearchStore(searchCinemas);

  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  onDestroy(() => {
    unsubscribe();
  });
</script>

<title>Legacy Cinema | Cinemas</title>
<div
  class="z-40 bg-cover absolute top-0 right-0 left-0 h-[450px] bg-bottom"
  style="background-image: url({src})"
>
  <div class="flex mt-72 lg:mx-52 flex-col gap-4">
    <div class="flex flex-col gap-4">
      <p class="text-4xl md:text-5xl uppercase font-bold">
        {$searchStore.data[1].location_name}
      </p>
      <p class="">
        {$searchStore.data[1].address}
      </p>
    </div>
    <div class="">
      <Button color="red" size="lg" outline>More Info</Button>
      <Button color="red" size="lg">Showing Time</Button>
    </div>
  </div>
</div>
<main class="mt-[360px]">
  <div class="flex gap-5">
    <Search
      size="lg"
      placeholder="Search the cinemas..."
      bind:value={$searchStore.search}
    />
    <Button>Search</Button>
  </div>
  {#each $searchStore.filtered as location}
    <div class="flex mt-10 gap-10">
      <img
        src={`${PUBLIC_API_ENDPOINT}/thumbnail/logo.jpg?h=150&w=300`}
        alt="Logo"
      />
      <div class="flex flex-col justify-between">
        <div class="flex flex-col gap-4">
          <p class="text-2xl uppercase font-bold">{location.location_name}</p>
          <p>{location.address}</p>
        </div>
        <div class="flex gap-5">
          <Button outline color="light" href={`/cinema/${location.location_id}`}
            >More Info</Button
          >
          <Button
            outline
            color="red"
            href={`/showtime?cinema=${location.location_id}`}>Show Time</Button
          >
        </div>
      </div>
    </div>
    <div class="h-[0.5px] w-full bg-gray-800 mt-10" />
  {/each}
</main>

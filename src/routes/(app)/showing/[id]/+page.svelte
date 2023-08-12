<script lang="ts">
  import moment from "moment";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { Button } from "flowbite-svelte";
  import { Embed } from "$lib";

  export let data;
  let movie = data.data.movie[0];
  let endpoint = `${PUBLIC_API_ENDPOINT}/thumbnail/`;
  let location = false;
  const showLocation = () => {
    location = true;
  };
</script>

<title>Legacy Cinema | {movie.title}</title>
<main class=" container text-black dark:text-white mx-auto">
  <div class="flex gap-10 mx-10 mt-5">
    <img
      src={endpoint + movie.poster.substring(8) + "?w=432&h=708"}
      class=" rounded-lg shadow-lg shadow-red-900"
      alt={movie.title}
    />
    <div class="flex gap-10 flex-col">
      <div class="flex justify-between">
        <p class="text-2xl text-bold">{movie.title}</p>
        <Button
          outline
          on:click={() => {
            showLocation;
          }}>Showtime</Button
        >
      </div>
      <p class="flex items-center gap-5">
        {moment(movie.create_at, ["YYYY-MM-DD", "DD-MM-YYYY"]).format(
          "DD MMMM YYYY"
        )}
      </p>
      <p class="flex items-center gap-5">{movie.time}</p>
      <p class="flex items-center gap-5">{movie.genre}</p>
      <p class="w-[50vw]">{movie.description}</p>
      <Embed url={movie.trailer} auto={true} />
    </div>
  </div>
</main>
{#if location}{/if}

<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { Button } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import moment from "moment-timezone";
  import { ClockOutline, TagOutline } from "flowbite-svelte-icons";

  export let data: PageData;
  let cinema = $page.url.searchParams.get("cinema");
  let movie = data.movie;
  console.log(movie);
</script>

<title>Legacy Cinema | Show Time</title>

{#if cinema}
  <p class="text-3xl uppercase font-bold">Cinemas</p>
  {#each movie as cinema}
    <div>
      {#each cinema.Halls as hall}
        {#if hall.showing.length > 0}
          <div class="bg-slate-900 p-5 my-3">
            <div class="flex justify-between mb-5">
              <p class="font-bold text-2xl uppercase">{cinema.location_name}</p>
              <p>{hall.hall_name}</p>
            </div>
            {#each hall.showing as showing, i (showing.movie_id)}
              {#if new Date(showing.showing_date) >= new Date(new Date().toISOString())}
                {#if i !== 0 && showing.movie.title !== hall.showing[i - 1].movie.title}
                  <div class="flex gap-5">
                    <img
                      src={`${PUBLIC_API_ENDPOINT}/thumbnail/${showing.movie.poster.substring(
                        8
                      )}?w=130&h=200`}
                      alt={showing.movie.title}
                    />
                    <div class="flex flex-col gap-5">
                      <p class="text-xl font-semibold">{showing.movie.title}</p>
                      <p class="flex items-center gap-2">
                        <ClockOutline />
                        {showing.movie.time} Minutes
                      </p>
                      <p class="flex items-center gap-2">
                        <TagOutline />
                        {showing.movie.genre} Minutes
                      </p>
                    </div>
                  </div>
                {:else if i === 0}
                  <p>
                    {showing.movie.title}
                  </p>
                {/if}
                {#if new Date(moment(showing.showing_date)
                    .tz("Atlantic/Faroe")
                    .format("LLL")) >= new Date()}
                  <Button outline class="mr-2 my-5"
                    >{moment(showing.showing_date)
                      .tz("Atlantic/Reykjavik")
                      .format("LT")}</Button
                  >
                {:else}
                  <Button outline class="mr-2 my-5" disabled
                    >{moment(showing.showing_date)
                      .tz("Atlantic/Reykjavik")
                      .format("LT")}</Button
                  >
                {/if}
              {/if}
            {/each}
          </div>
        {/if}
      {/each}
    </div>
  {/each}
{:else}
  Movie
{/if}

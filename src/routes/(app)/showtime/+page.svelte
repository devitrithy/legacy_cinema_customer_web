<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { Button, Indicator, Spinner, Tooltip } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import moment from "moment-timezone";
  import { ClockOutline, TagOutline } from "flowbite-svelte-icons";
  import { Seat } from "$lib";
  import { goto } from "$app/navigation";
  import axios from "axios";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";
  function scrollTo() {
    const targetElement = document.getElementById("seat");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  export let data: PageData;
  let cinema = $page.url.searchParams.get("cinema");
  let movie = data.movie;
  let showSeat = false;
  let showMovie;
  let selected = [];
  let tickets = [];
  let loading = false;
  let sid;
  let total;
  let disabled;

  let showingSeats = async (id) => {
    //
    let token = data.token;
    loading = true;
    sid = id;
    selected = [];
    tickets = [];

    total = 0;
    await axios
      .get(`${PUBLIC_API_ENDPOINT}/ticket/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (res) => {
        tickets = res.data;
        await axios
          .get(`${PUBLIC_API_ENDPOINT}/showing/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            showMovie = res.data.showingtime[0];
            showSeat = true;
            console.log(showMovie);
          });
      })
      .catch((err) => {
        console.log(err);
        goto(`/login`);
      });
    loading = false;
    scrollTo();
  };

  const select = (seatNumber: String) => {
    disabled = false;
    for (let index = 0; index < selected.length; index++) {
      if (seatNumber === selected[index]) {
        selected.splice(index, 1);
        selected = selected;
        if (selected.length < 1) disabled = true;
        total = showMovie.price * selected.length;
        return;
      }
    }
    let legth = selected.length + 1;
    total = showMovie.price * legth;
    console.log(selected.length);
    selected.push(seatNumber);
    selected = selected;
  };
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
            {#each hall.showing as showing, i}
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
                  <Button
                    outline
                    class="mr-2 my-5"
                    type="button"
                    on:click={() => {
                      showingSeats(showing.showing_id);
                    }}
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

{#if showSeat}
  <main class=" z-10 mx-auto mt-20 container" id="seat">
    <div class="gap-10 grid grid-cols-1 2xl:grid-cols-3">
      <main
        class="bg-stone-950 px-10 py-10 2xl:col-span-2 h-[30rem] md:h-[38rem] lg:h-[47rem] flex flex-col"
      >
        <div
          class="dark:text-white flex justify-center gap-10 order-first text-white"
        >
          <span class="flex items-center"
            ><Indicator size="sm" color="red" class="mr-1.5" />Unavailable</span
          >
          <span class="flex items-center"
            ><Indicator size="sm" color="gray" class="mr-1.5" />Available</span
          >
          <span class="flex items-center"
            ><Indicator size="sm" color="green" class="mr-1.5" />Selected</span
          >
        </div>
        <div
          class="border dark:border-gray-600 h-16 mx-5 mt-10 flex justify-center items-center order-last"
        >
          <h1 class="text-white text-3xl">Screen</h1>
        </div>
        {#if loading}
          <div class="w-full h-full flex justify-center items-center">
            <Spinner color="gray" />
          </div>
        {:else}
          <div class="flex justify-center h-full w-full">
            <div
              class="grid w-5 dark:text-white my-5 justify-center items-center text-white"
            >
              <p>A</p>
              <p>B</p>
              <p>C</p>
              <p>D</p>
              <p>E</p>
              <p>F</p>
              <p>G</p>
              <p>H</p>
              <p>I</p>
            </div>
            <div class="grid grid-cols-20 m-5 gap-1">
              {#each tickets as seat}
                <div id={`hover${seat.id}`}>
                  <Tooltip
                    triggeredBy={`#hover${seat.id}`}
                    color={seat.selected ? "red" : "green"}
                    class="text-2xl">{seat.seatNumber}</Tooltip
                  >
                  {#if seat.selected}
                    <Seat isAvailable={false} />
                  {:else}
                    <button on:click={() => select(seat.seatNumber)}>
                      <Seat />
                    </button>
                  {/if}
                </div>
              {/each}
            </div>
            <div
              class="grid w-5 dark:text-white my-5 justify-center items-center text-white"
            >
              <p>A</p>
              <p>B</p>
              <p>C</p>
              <p>D</p>
              <p>E</p>
              <p>F</p>
              <p>G</p>
              <p>H</p>
              <p>I</p>
            </div>
          </div>
        {/if}
      </main>
      <aside
        class=" h-full outline rounded-lg dark:outline-slate-700 dark:text-white flex flex-col p-5 gap-5"
      >
        <div class="flex gap-10">
          <img
            width="184"
            height="274"
            src={`${PUBLIC_API_ENDPOINT}/thumbnail/${showMovie.movie.poster.substring(
              8
            )}?w=184&h=274`}
            alt=""
          />
          <div class="flex flex-col justify-between">
            <h1>
              <span class=" font-bold">{showMovie.movie.title}</span>
            </h1>
            <div class="flex flex-col gap-5">
              <h1>
                <span>
                  {moment(showMovie.showing_date)
                    .tz("Atlantic/Reykjavik")
                    .format("LLL")}
                </span>
              </h1>
              <h1>
                <span>{showMovie.movie.time} Minutes</span>
              </h1>
              <h1>
                <span>{showMovie.movie.genre}</span>
              </h1>
            </div>
          </div>
        </div>
        <div class="h-[.5px] bg-gray-700 m-5" />
        <div class="uppercase flex flex-col gap-5 font-bold">
          <h1>
            <span>Legacy Cinema {showMovie.hall.location.location_name}</span>
          </h1>
          <h1><span>{showMovie.hall.hall_name}</span></h1>
          <h1>Seat: $5</h1>
          <h1>
            <span
              >{moment(showMovie.showing_date)
                .tz("Atlantic/Reykjavik")
                .format("LL")}</span
            >
          </h1>
          <div class="h-[.5px] bg-gray-700 m-5" />
          <h1>
            Seat
            {#each selected as select}
              <span class="mx-1 font-thin">
                {select}
              </span>
            {/each}
          </h1>
        </div>
        <h1><span class="font-bold text-xl">Total ${total}</span></h1>
        <form action="?/pay" method="post">
          <input type="hidden" name="pay" bind:value={selected} />
          <input
            type="hidden"
            name="price_id"
            bind:value={showMovie.movie.price_id}
          />
          <input
            type="hidden"
            name="genre"
            bind:value={showMovie.movie.genre}
          />
          <input
            type="hidden"
            name="date"
            value={$page.url.searchParams.get("day")}
          />
          <input type="hidden" name="sid" bind:value={showMovie.showing_id} />
          <input type="hidden" name="mid" bind:value={showMovie.movie_id} />
          <input
            type="hidden"
            name="title"
            bind:value={showMovie.movie.title}
          />
          <input type="hidden" name="price" bind:value={showMovie.price} />
          <div class="w-full grid">
            <Button type="submit" pill {disabled}>Pay</Button>
          </div>
        </form>
      </aside>
    </div>
  </main>
{/if}

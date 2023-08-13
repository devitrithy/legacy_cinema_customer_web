<script lang="ts">
  import moment from "moment-timezone";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import axios from "axios";
  import { Button, Indicator, Spinner, Tooltip } from "flowbite-svelte";
  import { Embed, ScrollTo, Seat } from "$lib";
  function convertTZ(date: Date) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: "Atlantic/Reykjavik" }
      )
    );
  }
  export let data;
  let loading = false;
  let { locations } = data;
  let location = false;
  let movie = data.movie.movie[0];
  let showSeat = false;
  let total: number = 0;
  let disabled = false;

  let tickets: any;
  let showing: any;
  let selected: String[] = [];
  let endpoint = `${PUBLIC_API_ENDPOINT}/thumbnail/`;
  const showingSeat = async (id: any) => {
    const res = await axios.get(`${PUBLIC_API_ENDPOINT}/ticket/${id}`, {
      headers: { Authorization: "Bearer guest" },
    });
    const show = await axios.get(`${PUBLIC_API_ENDPOINT}/showing/${id}`, {
      headers: { Authorization: "Bearer guest" },
    });
    console.log(show.data);
    console.log(res.data);

    tickets = res.data;
    showing = show.data.showingtime[0];
    showSeat = true;
  };

  const select = (seatNumber: String) => {
    disabled = false;
    for (let index = 0; index < selected.length; index++) {
      if (seatNumber === selected[index]) {
        selected.splice(index, 1);
        selected = selected;
        if (selected.length < 1) disabled = true;
        total = showing.price * selected.length;
        return;
      }
    }
    let legth = selected.length + 1;
    total = showing.price * legth;
    console.log(selected.length);
    selected.push(seatNumber);
    selected = selected;
  };
</script>

<title>Legacy Cinema | {movie.title}</title>
<div class="flex gap-10 mx-10">
  <img
    src={endpoint + movie.poster.substring(8) + "?w=432&h=708"}
    class=" rounded-lg shadow-lg shadow-red-900"
    alt={movie.title}
  />
  <div class="flex gap-10 flex-col">
    <div class="flex justify-between">
      <p class="text-2xl text-bold">{movie.title}</p>
      <button
        on:click={() => {
          location = true;
        }}><ScrollTo targetId="location" text="Show Times" /></button
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
{#if location}
  <div class="m-10" id="location">
    <p class="uppercase text-2xl font-bold">Location</p>
    <main class="my-5">
      {#each locations as location}
        <div class="dark:bg-slate-900 p-4 mb-4">
          {#each location.Halls as hall}
            <div class="flex justify-between mx-2 my-5">
              <h2 class="text-xl font-semibold mb-2 uppercase">
                legacy cinema | {location.location_name}
              </h2>
              <h3 class="text-lg font-semibold mb-1 float-right underline">
                {hall.hall_name}
              </h3>
            </div>
            <div class="dark:bg-slate-900 p-2 mb-2 flex flex-wrap gap-4">
              {#each hall.showing as showingTime}
                <Button
                  outline
                  on:click={() => {
                    showingSeat(showingTime.showing_id);
                  }}
                >
                  {moment(showingTime.showing_date)
                    .tz("Atlantic/Reykjavik")
                    .format("LT")}
                </Button>
              {/each}
            </div>
          {/each}
        </div>
      {/each}
    </main>
  </div>
{/if}

{#if showSeat}
  <main class=" z-10 mx-auto mt-20 container" id="seat">
    <div class="flex justify-between gap-10">
      <main class="bg-stone-950 px-10 py-10">
        <div class="dark:text-white flex justify-center gap-10">
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
        <div class="flex">
          <div
            class="grid w-5 dark:text-white my-5 justify-center items-center"
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
                  <div on:click={() => select(seat.seatNumber)}>
                    <Seat />
                  </div>
                {/if}
              </div>
            {/each}
          </div>
          <div
            class="grid w-5 dark:text-white my-5 justify-center items-center"
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
        <div
          class="border dark:border-gray-600 h-16 mx-5 mt-10 flex justify-center items-center"
        >
          <h1 class="dark:text-white text-3xl">Screen</h1>
        </div>
      </main>
      <aside
        class="w-1/3 h-full outline rounded-lg dark:outline-slate-700 dark:text-white flex flex-col p-5 gap-5"
      >
        <div class="flex gap-10">
          <img
            width="184"
            height="274"
            src={endpoint + showing.movie.poster.substring(8) + "?w=184&h=274"}
            alt=""
          />
          <div class="flex flex-col justify-between">
            <h1>
              <span class=" font-bold">{showing.movie.title}</span>
            </h1>
            <div class="flex flex-col gap-5">
              <h1>
                <span>
                  {moment(showing.showing_date)
                    .tz("Atlantic/Reykjavik")
                    .format("LLL")}
                </span>
              </h1>
              <h1>
                <span>{showing.movie.time} Minutes</span>
              </h1>
              <h1>
                <span>{showing.movie.genre}</span>
              </h1>
            </div>
          </div>
        </div>
        <div class="h-[.5px] bg-gray-700 m-5" />
        <div class="uppercase flex flex-col gap-5 font-bold">
          <h1>
            <span>Legacy Cinema {showing.hall.location.location_name}</span>
          </h1>
          <h1><span>{showing.hall.hall_name}</span></h1>
          <h1>
            <span
              >{moment(showing.showing_date)
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
          <input type="hidden" name="sid" bind:value={showing.showing_id} />
          <input type="hidden" name="title" value={movie.title} />
          <input type="hidden" name="price" value={showing.price} />
          <div class="w-full grid">
            <Button type="submit" pill>
              <Spinner class="mr-3" size="4" />
              Pay</Button
            >
          </div>
        </form>
      </aside>
    </div>
  </main>
{/if}

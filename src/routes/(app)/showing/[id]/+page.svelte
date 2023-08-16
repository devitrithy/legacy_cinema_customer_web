<script lang="ts">
  import moment from "moment-timezone";
  import checkMark from "./checked.png";
  import removeMark from "./remove.png";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import axios from "axios";
  import { Button, Indicator, Modal, Spinner, Tooltip } from "flowbite-svelte";
  import { Embed, ScrollTo, Seat } from "$lib";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    CalendarMonthOutline,
    ClockOutline,
    TagOutline,
  } from "flowbite-svelte-icons";
  function scrollTo() {
    const targetElement = document.getElementById("seat");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }
  function convertTZ(date: Date) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: "Atlantic/Reykjavik" }
      )
    );
  }
  let loading = false;
  const nextDay = (day: Number) => {
    return new Date(Date.now() + 3600 * 1000 * 24 * day);
  };
  export let data;
  let sid = $page.url.searchParams.get("sid");
  let locations: any;
  $: locations = data.locations;
  let location = false;
  let movie = data.movie.movie[0];
  let showSeat = false;
  let total: number = 0;
  let resultModal = false;
  let success = false;
  let resutlMessage = "";
  let { token } = data;
  let tkn = $page.url.searchParams.get("tkn");

  onMount(async () => {
    if ($page.url.searchParams.get("result") === "success") {
      // BUG: FIX THIS IF I HAVE TIME THE BUG IS ANYONE CAN ACCESS THIS ROUTE
      success = true;
      resutlMessage =
        "You booked the ticket successfully, Please tell the staff your name to recived the ticket.";
      resultModal = true;
      const id = $page.url.searchParams.get("sid");
      const ticket = await axios.get(`${PUBLIC_API_ENDPOINT}/ticket/${id}`, {
        headers: { Authorization: `Bearer ${tkn}` },
      });
      const showingDate = await axios.get(
        `${PUBLIC_API_ENDPOINT}/showing/${id}`,
        {
          headers: { Authorization: `Bearer ${tkn}` },
        }
      );
      tickets = ticket.data;
      showing = showingDate.data.showingtime[0];
      location = true;
      showSeat = true;
    } else if ($page.url.searchParams.get("result") === "cancel") {
      success = false;
      resultModal = true;
      const id = $page.url.searchParams.get("sid");
      const ticket = await axios.get(`${PUBLIC_API_ENDPOINT}/ticket/${id}`, {
        headers: { Authorization: `Bearer ${tkn}` },
      });
      const showingDate = await axios.get(
        `${PUBLIC_API_ENDPOINT}/showing/${id}`,
        {
          headers: { Authorization: `Bearer ${tkn}` },
        }
      );
      tickets = ticket.data;
      showing = showingDate.data.showingtime[0];
      location = true;
      showSeat = true;
      resutlMessage =
        "You just cancel the booking. Feel free to check more movie you want";
    } else {
      if ($page.url.searchParams.get("booking") === "1") {
        location = true;
      }
    }
  });

  const changeDate = () => {
    sid = "";
    showSeat = false;
  };

  let tickets: any[] = [];
  let showing: any;
  let selected = [];
  let endpoint = `${PUBLIC_API_ENDPOINT}/thumbnail/`;
  const showingSeat = async (id: any) => {
    loading = true;
    sid = id;
    selected = [];
    tickets = [];

    total = 0;
    await axios
      .get(`${PUBLIC_API_ENDPOINT}/ticket/${id}`, {
        headers: { Authorization: `Bearer ${token || tkn}` },
      })
      .then(async (res) => {
        tickets = res.data;
        await axios
          .get(`${PUBLIC_API_ENDPOINT}/showing/${id}`, {
            headers: { Authorization: `Bearer ${token || tkn}` },
          })
          .then((res) => {
            showing = res.data.showingtime[0];
            showSeat = true;
          });
      })
      .catch((err) => {
        goto(`/login`);
      });
    loading = false;
    scrollTo();
  };
  let disabled = true;

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
      <span><CalendarMonthOutline /> </span>
      {moment(movie.create_at, ["YYYY-MM-DD", "DD-MM-YYYY"]).format(
        "DD MMMM YYYY"
      )}
    </p>
    <p class="flex items-center gap-5">
      <span><ClockOutline /></span>
      {movie.time} Minutes
    </p>
    <p class="flex items-center gap-5">
      <span><TagOutline /></span>
      {movie.genre}
    </p>
    <p class="w-[50vw]">{movie.description}</p>
    <Embed url={movie.trailer} auto={true} />
  </div>
</div>
{#if location}
  <div class="m-10" id="location">
    <div class="flex justify-between flex-col md:flex-row gap-5">
      <p class="uppercase text-2xl font-bold">Location</p>
      <div>
        <Button
          href={`?day=${new Date().getDate()}`}
          on:click={changeDate}
          outline={Number(new Date().getDate()) !==
            Number($page.url.searchParams.get("day") || new Date().getDate())}
          >{moment(new Date()).tz("Atlantic/Reykjavik").format("LL")}</Button
        >
        <Button
          href={`?day=${new Date().getDate() + 1}`}
          on:click={changeDate}
          outline={Number(new Date(nextDay(1)).getDate()) !==
            Number($page.url.searchParams.get("day"))}
          >{moment(new Date(nextDay(1)))
            .tz("Atlantic/Reykjavik")
            .format("LL")}</Button
        >
        <Button
          href={`?day=${new Date().getDate() + 2}`}
          on:click={changeDate}
          outline={Number(new Date(nextDay(2)).getDate()) !==
            Number($page.url.searchParams.get("day"))}
          >{moment(new Date(nextDay(2)))
            .tz("Atlantic/Reykjavik")
            .format("LL")}</Button
        >
      </div>
    </div>
    <main class="my-5">
      {#each locations as location}
        <div class="dark:bg-slate-900 p-4 mb-4">
          {#each location.Halls as hall}
            {#if hall.showing.length > 0}
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
                    outline={sid !== showingTime.showing_id}
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
            {/if}
          {/each}
        </div>
      {/each}
    </main>
  </div>
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
          <input
            type="hidden"
            name="date"
            value={$page.url.searchParams.get("day")}
          />
          <input type="hidden" name="sid" bind:value={showing.showing_id} />
          <input type="hidden" name="title" value={movie.title} />
          <input type="hidden" name="price" value={showing.price} />
          <div class="w-full grid">
            <Button type="submit" pill {disabled}>Pay</Button>
          </div>
        </form>
      </aside>
    </div>
  </main>
{/if}

<Modal bind:open={resultModal} size="xs" autoclose>
  <div class="text-center flex flex-col items-center">
    <img src={success ? checkMark : removeMark} alt="" srcset="" class="w-20" />
    <h3 class="m-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      {resutlMessage}
    </h3>
    <div class="flex gap-5">
      <Button
        outline
        on:click={() => {
          scrollTo();
        }}>Close</Button
      >
      <Button color="green" outline href="/booked">See Ticket</Button>
    </div>
  </div>
</Modal>

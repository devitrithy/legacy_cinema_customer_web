<script lang="ts">
  import { Badge } from "flowbite-svelte";
  import type { PageData } from "./$types";
  import moment from "moment-timezone";
  import { ClockOutline } from "flowbite-svelte-icons";

  export let data: PageData;
  let { booking } = data;
  console.log(booking.booked[0].Showingtime);
</script>

<title>Legacy Cinema | Booking</title>

<main class="container mx-auto mt-8">
  <h1 class="text-3xl font-semibold mb-4">Your Booked Movie Tickets</h1>

  <ul class="space-y-4">
    {#if booking.booked.length > 0}
      {#each booking.booked as ticket}
        <p>{ticket.Showingtime.movie.title}</p>
        <li class="bg-slate-700 p-4 rounded shadow">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-lg font-semibold mb-2">
                Movie: {ticket.Showingtime.movie.title} | {ticket.Showingtime
                  .hall.location.location_name} | {ticket.Showingtime.hall
                  .hall_name}
              </p>
              <p>
                Date: {moment(ticket.Showingtime.showing_date)
                  .tz("Atlantic/Reykjavik")
                  .format("LL")}, Time: {moment(ticket.Showingtime.showing_date)
                  .tz("Atlantic/Reykjavik")
                  .format("LT")}
              </p>
              <div class="flex gap-5 flex-wrap">
                {#each ticket.TicketDetails as td}
                  <p>Seat: {td.seat}</p>
                {/each}
              </div>
            </div>
            <div>
              <Badge color="green" border>
                <ClockOutline />
                <span class="ml-3"
                  >{moment(ticket.create_at)
                    .tz("Atlantic/Reykjavik")
                    .format("LLL")}</span
                >
              </Badge>
            </div>
          </div>
        </li>
      {/each}
    {/if}
  </ul>
</main>

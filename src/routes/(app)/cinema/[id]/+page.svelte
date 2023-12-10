<script lang="ts">
  import { Button } from "flowbite-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let location = data.location.location[0];
  //console.log(location);
</script>

<main>
  <div class="flex mt-2 gap-10">
    <div class="flex flex-col justify-between">
      <div class="flex flex-col gap-4">
        <p class="text-2xl uppercase font-bold">{location.location_name}</p>
        <p>{location.address}</p>
      </div>
      <div class="flex gap-5 mt-5">
        <Button
          outline
          color="red"
          href={`/showtime?cinema=${location.location_id}`}>Show Time</Button
        >
      </div>
    </div>
  </div>
  <div class="h-[0.5px] w-full bg-gray-800 mt-10" />
  <iframe
    src={data.location.location[0].map}
    width="1500"
    height="600"
    style="border:0;"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  />
</main>

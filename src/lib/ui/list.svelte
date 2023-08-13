<script lang="ts">
  export let name = "Location Name";
  export let hall = "Hall 3";
  export let list = "";
</script>

<article class="bg-stone-200 dark:bg-slate-900 px-10 py-5 rounded-lg shadow-xl">
  <div class="flex justify-between">
    <p class="uppercase">{name} | Legacy Cinema</p>
    <p class="uppercase underline">{hall}</p>
  </div>
  {#if list.length > 0}
    {#each list as l}
      <button class="my-5 py-3 px-3 bg-primary-700 rounded-md">
        {l}
      </button>
    {/each}
  {:else}
    <p class="uppercase mt-5">No Time to show yet</p>
  {/if}
</article>

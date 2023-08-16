<script>
  import { FloatingLabelInput, Helper } from "flowbite-svelte";
  export let success = 0;
  export let message = "";
  export let type = "text";
  export let name = "text";
  export let label = "Text";
  export let value;
</script>

<div>
  <FloatingLabelInput
    bind:value
    color={`${success == 1 ? "green" : success == 2 ? "red" : "base"}`}
    style="outlined"
    id={name}
    aria-describedby={name}
    {name}
    {type}
    {label}
  />
  {#if success !== 0}
    <Helper color={`${success == 1 ? "green" : "red"}`}>
      <span class="font-medium">{message}</span></Helper
    >
  {/if}
</div>

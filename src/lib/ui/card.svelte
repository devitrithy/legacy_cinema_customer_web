<script lang="ts">
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";

  const endpoint = PUBLIC_API_ENDPOINT;
  export let url = `no-image.png`;
</script>

<div class="w-[300px]">
  <img width="300" src={`${endpoint}/thumbnail/${url}?w=200&h=300`} alt="" />
</div>

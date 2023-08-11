<script lang="ts">
  import { Carousel } from "flowbite-svelte";
  export let images = [];
</script>

<Carousel
  {images}
  showThumbs={false}
  showIndicators={true}
  slideControls={false}
  showCaptions={false}
  loop
  duration="5000"
/>

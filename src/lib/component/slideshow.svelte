<script lang="ts">
  import { Carousel } from "flowbite-svelte";
  export let images: any = [];
</script>

<Carousel
  {images}
  showThumbs={false}
  showIndicators={true}
  slideControls={true}
  showCaptions={false}
  loop
  duration={5000}
/>

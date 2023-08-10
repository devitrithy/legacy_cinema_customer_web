<script lang="ts">
  import { Carousel } from "flowbite-svelte";
  export let images = [];
</script>

<Carousel
  classSlide="flex items-center justify-center h-full w-full !rounded-none !bg-transparent"
  {images}
  showThumbs={false}
  showIndicators={true}
  slideControls={false}
  showCaptions={false}
  loop
  duration="5000"
/>

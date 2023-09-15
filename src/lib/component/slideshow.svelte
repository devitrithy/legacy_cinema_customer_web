<script lang="ts">
  import { Carousel } from "flowbite-svelte";
  export let images: any = [];
</script>

<Carousel
  {images}
  divClass="!rounded-none"
  showThumbs={false}
  showIndicators={false}
  slideControls={true}
  showCaptions={false}
  loop
  duration={5000}
/>

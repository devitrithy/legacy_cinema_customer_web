<script lang="ts">
  import { Carousel } from "flowbite-svelte";
  export let images: any = [];
</script>

<Carousel
  divClass="!rounded-none"
  {images}
  showThumbs={false}
  showIndicators={false}
  slideControls={true}
  showCaptions={false}
  loop
  duration={5000}
/>

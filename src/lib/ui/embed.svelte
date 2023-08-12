<script lang="ts">
  export let url: String = "zgycl_7EZeE";
  export let title = "Test";
  export let width;
  export let height = 400;
  export let auto = 0;
</script>

<iframe
  {width}
  {height}
  class="h-[{height}px] aspect-auto"
  loading="lazy"
  src={`https://www.youtube-nocookie.com/embed/${url}?autoplay=${auto}&mute=1`}
  {title}
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share muted"
  allowfullscreen
/>

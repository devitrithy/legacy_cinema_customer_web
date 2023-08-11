<script lang="ts">
  import play from "./play.png";
  export let url: String = "zgycl_7EZeE";
  export let title = "Test";
  export let width = 500;
  export let height = 300;
  export let auto = 0;
</script>

<iframe
  {width}
  {height}
  loading="lazy"
  src={`https://www.youtube-nocookie.com/embed/${url}?autoplay=${auto}&mute=1`}
  {title}
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share muted"
  allowfullscreen
/>

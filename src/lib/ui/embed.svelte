<script lang="ts">
  export let url = "zgycl_7EZeE";
  export let title = "Test";
  export let width = 500;
  export let height = 300;
</script>

<iframe
  {width}
  {height}
  src={`https://www.youtube.com/embed/${url}`}
  {title}
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share muted"
  allowfullscreen
/>

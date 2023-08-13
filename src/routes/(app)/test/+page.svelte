<!-- src/routes/index.svelte -->
<script>
  import { ScrollTo } from "$lib";
</script>

<ScrollTo targetId="section1" />
<ScrollTo targetId="section2" />
<div id="section1" style="height: 1000px;">
  <p>This is section 1</p>
</div>

<div id="section2" style="height: 1000px;">
  <p>This is section 2</p>
</div>

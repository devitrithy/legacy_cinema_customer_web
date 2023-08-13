<!-- src/components/ScrollTo.svelte -->
<script>
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  export let targetId;
  export let text = "Scroll";

  function scrollTo() {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  onMount(() => {
    setTimeout(() => {
      console.log("hi"), 30000;
    });
    const button = document.getElementById(`scrollTo-${targetId}`);
    if (button) {
      button.addEventListener("click", scrollTo);
    }
  });
</script>

<button id={`scrollTo-${targetId}`}><Button outline>{text}</Button></button>

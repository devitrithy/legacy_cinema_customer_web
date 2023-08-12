<script lang="ts">
  import Navbar from "$lib/component/navbar.svelte";
  import Footer from "$lib/component/footer.svelte";
  import Slideshow from "$lib/component/slideshow.svelte";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  let m = { x: 0, y: 0 };

  function handleMove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
    if (m.y > 800) {
      isFooterVisible = true;
    } else {
      isFooterVisible = false;
    }
  }

  export let data;
  let slideshows = data.data.slideshows;
  let images: { id: number; name: any; imgurl: string; attribution: any }[] =
    [];
  for (let i = 0; i < slideshows.length; i++) {
    images.push({
      id: i,
      name: slideshows[i].title,
      imgurl: `${PUBLIC_API_ENDPOINT}/${slideshows[i].poster}`,
      attribution: slideshows[i].title,
    });
  }

  let isNavbarVisible = true;
  let isFooterVisible = true;

  function handleScroll() {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
      isNavbarVisible = false;
      isFooterVisible = false;
    } else {
      isNavbarVisible = true;
      isFooterVisible = true;
    }

    lastScrollPosition = currentScrollPosition;
  }
  let lastScrollPosition = 0;
  onMount(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<div class="fixed top-0 right-0 left-0 z-50">
  <Navbar />
</div>
<div class="pt-[70px]">
  {#if $page.url.pathname === "/"}
    <Slideshow {images} />
  {/if}
</div>
<div
  on:pointermove={handleMove}
  class="flex mx-auto text-black dark:text-white dark:bg-slate-950 my-14 mb-20"
>
  <main class="container mx-auto">
    <slot />
  </main>
</div>
<div
  class:translate-y-0={isFooterVisible}
  class="translate-y-full fixed bottom-0 left-0 right-0 footer transition-transform duration-300"
>
  <Footer />
</div>

<script>
  import Navbar from "$lib/component/navbar.svelte";
  import Footer from "$lib/component/footer.svelte";
  import Slideshow from "$lib/component/slideshow.svelte";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  export let data;

  let slideshows = data.data.slideshows;
  console.log(slideshows);
  let images = [];
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
  let lastScrollPosition = 0;

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

  onMount(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<Navbar />
<div class="pt-[70px]">
  {#if $page.url.pathname === "/"}
    <Slideshow {images} />
  {/if}
</div>
<div
  class:translate-y-0={isNavbarVisible}
  class="translate-y-full fixed top-0 left-0 right-0 transition-transform duration-300"
>
  <Navbar />
</div>
<div
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

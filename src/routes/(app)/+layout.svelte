<script>
  import Navbar from "$lib/component/navbar.svelte";
  import Footer from "$lib/component/footer.svelte";
  import Slideshow from "$lib/component/slideshow.svelte";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { page } from "$app/stores";
  export let data;

  let images = [];
  let slideshows = data.data.slideshows;
  for (let i = 0; i < slideshows.length; i++) {
    images.push({
      id: i,
      name: slideshows[i].title,
      imgurl: `${PUBLIC_API_ENDPOINT}/${slideshows[i].poster}`,
      attribution: slideshows[i].title,
    });
  }
</script>

<title>Legacy Cinema</title>
<Navbar />
<div>
  <slot name="slideshow" />
</div>
<div class="pt-[70px]">
  {#if $page.url.pathname === "/"}
    <Slideshow {images} />
  {/if}
</div>
<div
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
  class="translate-y-full fixed bottom-0 left-0 right-0 footer transition-transform duration-300"
>
  <Footer />
</div>

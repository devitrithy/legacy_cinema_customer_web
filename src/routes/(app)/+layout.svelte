<script>
  import Navbar from "$lib/component/navbar.svelte";
  import Footer from "$lib/component/footer.svelte";
  import Slideshow from "$lib/component/slideshow.svelte";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";
  import { page } from "$app/stores";
  console.log($page.url.pathname);
  export let data;
  let slideshows = data.data.slideshows;
  let images = [];
  for (let i = 0; i < slideshows.length; i++) {
    images.push({
      id: i,
      name: slideshows[i].title,
      imgurl: `${PUBLIC_API_ENDPOINT}/${slideshows[i].poster}`,
      attribution: slideshows[i].title,
    });
  }
</script>

<Navbar />
{#if $page.url.pathname === "/"}
  <Slideshow {images} />
{/if}
<div
  class="flex mx-auto text-black dark:text-white dark:bg-slate-950 my-14 mb-20"
>
  <main class="container mx-auto">
    <slot />
  </main>
</div>
<div class="fixed bottom-0 left-0 right-0">
  <Footer />
</div>

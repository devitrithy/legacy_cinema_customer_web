<script>
  import "../app.postcss";
  import Navbar from "$lib/component/navbar.svelte";
  import Footer from "$lib/component/footer.svelte";
</script>

<Navbar />
<div class="flex px-4 mx-auto min-h-[93vh] w-full dark:bg-slate-950">
  <main class="lg:ml-72 w-full mx-auto">
    <slot />
  </main>
</div>
<Footer />

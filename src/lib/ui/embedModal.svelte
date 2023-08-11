<script>
  import { Embed } from "$lib";
  import { Modal } from "flowbite-svelte";
  export let popupModal = false;
  export let trialerVideo = "";
</script>

<Modal bind:open={popupModal} autoclose size="lg" outsideclose>
  <div class="flex justify-center items-center">
    <Embed
      width={770}
      height={400}
      url={trialerVideo}
      auto={true}
      show={true}
    />
  </div>
</Modal>

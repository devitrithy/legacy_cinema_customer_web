<script lang="ts">
  import moment from "moment";
  import { PUBLIC_API_ENDPOINT } from "$env/static/public";

  export let data;
  let movie = data.data.movie[0];
  let endpoint = `${PUBLIC_API_ENDPOINT}/thumbnail/`;
</script>

<main class="m-5 container text-black dark:text-white mt-20 mx-auto">
  <div class="flex gap-10 mx-10 mt-5">
    <img
      src={endpoint + movie.poster.substring(8) + "?w=432&h=708"}
      class=" rounded-lg shadow-lg shadow-red-900"
      alt={movie.title}
    />
    <div class="flex gap-10 flex-col">
      <div class="flex justify-between">
        <p class="text-2xl text-bold">{movie.title}</p>
        <a href="#">Showtime</a>
      </div>
      <p class="flex items-center gap-5">
        {moment(movie.create_at, ["YYYY-MM-DD", "DD-MM-YYYY"]).format(
          "DD MMMM YYYY"
        )}
      </p>
      <p class="flex items-center gap-5">{movie.time}</p>
      <p class="flex items-center gap-5">{movie.genre}</p>
      <p class="w-[50vw]">{movie.description}</p>
      <iframe
        class="h-full aspect-auto"
        src="https://www.youtube.com/embed/{movie.trailer}?autoplay=1&mute=1"
        title={movie.title}
        frameborder="0"
        allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; loop;"
        allowfullscreen
      />
    </div>
  </div>
</main>

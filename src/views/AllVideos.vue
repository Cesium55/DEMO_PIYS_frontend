<template>

    <h1>Hellow dude!</h1>

    <div class="movie_list">



        <div v-for="video in videos">
            <MovieItem :id="video.id" :title="video.title" :thumb_path="video.thumb_path" :video_path="video.video_path"
                v-if="video.video_processed" />
        </div>


    </div>




</template>

<script setup>
import config from '@/config';
import { ref, onMounted } from "vue";
import MovieItem from '@/components/MovieItem.vue';

console.log(config.media_api_all);
const link = ref(config.media_api_all)

const videos = ref(false)

onMounted(async function () {
    const response = await fetch(config.media_api_all)
    const response_data = await response.json()
    videos.value = response_data.data
})


// 

// console.log(videos.length)


</script>

<style scoped>
.movie_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}
</style>
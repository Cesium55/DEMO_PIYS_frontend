<template>
    <div class="video-container">
        <h1>Видео ID: {{ id }}</h1>
        <Player :video_src="video_src"></Player>
    </div>
</template>





<script setup>

import { useRoute } from 'vue-router'

import { ref, onMounted } from 'vue';
import config from '@/config';
import Player from '@/components/Player.vue';

const route = useRoute()
const id = route.params.id
const video_src = ref(null)


console.log("Request to " + config.media_api_get_video + "/" + id)
onMounted(async () => {
    const response = await fetch(config.media_api_get_video + "/" + id)
    const data = await response.json()

    video_src.value = config.media_storage_url + "/" + data["video_path"]
})

</script>




<style scoped>
.video-container {
    padding: 20px;
    text-align: center;
}
</style>

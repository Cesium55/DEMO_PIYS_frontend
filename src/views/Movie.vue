<template>
    <div class="video-container">
        <h1>Видео ID: {{ id }}</h1>
        <Player :video_src="video_src" :ru_subs="rus_subs_text" :eng_subs="eng_subs_text" v-if="video_src"></Player>
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
const rus_subs_text = ref(false)
const eng_subs_text = ref(false)


console.log("Request to " + config.media_api_get_video + "/" + id)
onMounted(async () => {
    const response = await fetch(config.media_api_get_video + "/" + id)
    const data = await response.json()

    const rus_subs_response = await fetch(config.media_storage_url + "/" + data["subs"]["rus"])
    rus_subs_text.value = await rus_subs_response.text()

    const eng_subs_response = await fetch(config.media_storage_url + "/" + data["subs"]["eng"])
    eng_subs_text.value = await eng_subs_response.text()



    video_src.value = config.media_storage_url + "/" + data["video_path"]
})

</script>




<style scoped>
.video-container {
    padding: 20px;
    text-align: center;
}
</style>

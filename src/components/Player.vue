<template>

    <div>
        <video ref="videoRef" class="plyr__video-embed" playsinline controls v-if="video_src">
            <source :src="video_src" type="video/mp4" />
        </video>
    </div>


</template>


<script setup>

import { ref, watch, onMounted } from 'vue';

import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

const props = defineProps({
    video_src: String
})

const videoRef = ref(null)
let player = null

onMounted(() => {
    if (videoRef.value) {
        player = new Plyr(videoRef.value)
    }
})


watch(() => props.video_src, (newSrc) => {
    if (videoRef.value && newSrc) {
        // Переустанавливаем источник и перезагружаем
        videoRef.value.src = newSrc
        videoRef.value.load()
    }
})
</script>

<style scoped>
#movie_player {
    width: 1200px;
}
</style>
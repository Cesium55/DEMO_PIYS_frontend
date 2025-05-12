<template>

    <div>
        <video id="movie_player" controls ref="player" :key="$props.video_src">
            <source :src="$props.video_src" type="video/mp4">
        </video>
    </div>


</template>


<script setup>

import { ref, watch } from 'vue';

const props = defineProps({
    video_src: String
})


const player = ref(null)



</script>

<style scoped>
#movie_player {
    width: 1200px;
}
</style>
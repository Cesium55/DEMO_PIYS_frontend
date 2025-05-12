<template>
    <div class="video-container" ref="video_cont">
        <video ref="videoRef" class="plyr__video-embed" playsinline controls>
            <source :src="video_src" type="video/mp4" />
        </video>




    </div>
    <div class="debug_info">
        <div>Time: {{ currentTime }}</div>
        <div>RUS: {{ subs1 }}</div>
        <div>ENG: {{ subs2 }}</div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import SrtParser from '@/scripts/SrtParser';

const props = defineProps({
    video_src: String,
    eng_subs: String,
    ru_subs: String
});

const video_cont = ref(null)
const videoRef = ref(null);
const currentTime = ref(null);
let player = null;

const subs1 = ref("")
const subs2 = ref("")

const subs_manager = new SrtParser(props.ru_subs, props.eng_subs)

const initPlayer = () => {
    if (player) {
        player.destroy();
    }
    player = new Plyr(videoRef.value);


    const subs_cont = document.getElementsByClassName("plyr__captions")[0]
    subs_cont.style.display = "block"



    player.on('timeupdate', () => {
        currentTime.value = player.currentTime;

        const current_subs = subs_manager.getSubtitleAt(player.currentTime)
        subs1.value = current_subs.rus
        subs2.value = current_subs.eng

        subs_cont.innerHTML = `
        <div class="subs_cont">
        <dev class="sub_line">${current_subs.rus}</div>    
        <dev class="sub_line">${current_subs.eng}</div>    
        </div>
        `

    });


};

onMounted(async () => {
    await nextTick();
    if (props.video_src && videoRef.value) {
        videoRef.value.load();
        initPlayer();
    }
});

watch(() => props.video_src, async (newSrc) => {
    if (newSrc && videoRef.value) {
        await nextTick();
        videoRef.value.load();
        initPlayer();
    }
});

</script>

<style scoped>
.time-display {
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.video-container {
    position: relative;
    width: 640px;
    max-width: 100%;
}

.subtitles {
    position: absolute;
    bottom: 10%;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 1.5em;
    text-shadow: 2px 2px 4px black;
    pointer-events: none;
    /* чтобы клик сквозь субтитры шел на видео */
}
</style>

<style>
.sub_line {
    color: white;
}
</style>
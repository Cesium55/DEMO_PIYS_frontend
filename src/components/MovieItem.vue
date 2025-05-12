<template>

    <div class="video_item">
        <div class="top_cont">
            <div class="img_cont">
                <img :src="thumb_path" alt="thumb" srcset="" v-if="props.thumb_path">
            </div>
        </div>
        <div class="bot_cont">
            <div class="big_title">
                <span>[{{ props.id }}] </span>
                <span>{{ props.title }}</span>
            </div>
        </div>
    </div>


</template>


<script setup>

import { ref } from 'vue';
import config from '@/config';

const props = defineProps({
    title: String,
    thumb_path: String,
    video_path: String,
    id: Number
})

const thumb_path = config.media_storage_url + "/" + props.thumb_path

</script>

<style scoped>
.video_item {
    border: 1px black solid;
    display: inline-block;
    padding: 10px 20px;
    border-radius: 5px;
    width: 250px;
    height: 350px;
}

.big_title {
    font-weight: bold;
}

.top_cont {
    margin-bottom: 10px;
}

.img_cont {
    max-width: 200px;
    max-height: 300px;
    min-width: 150px;
    min-height: 250px;

    background-color: black;
    margin: 0 auto;

}

.img_cont img {
    max-height: 100%;
    max-width: 100%;
    /* height: auto; */
    width: auto;
}
</style>
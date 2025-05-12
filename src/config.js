
const MEDIA_API_HOST = import.meta.env.VITE_MEDIA_API_HOST
const MEDIA_API_URL = MEDIA_API_HOST + "/api/v1"
const MEDIA_API_ALL = MEDIA_API_URL + "/videos"
const MEDIA_STORAGE_URL = import.meta.env.VITE_MEDIA_STORAGE_URL

const MEDIA_API_GET_VIDEO = MEDIA_API_URL + "/videos"


export default {
    media_api_host: MEDIA_API_HOST,
    media_api_url: MEDIA_API_URL,
    media_api_all: MEDIA_API_ALL,
    media_storage_url: MEDIA_STORAGE_URL,
    media_api_get_video: MEDIA_API_GET_VIDEO
};
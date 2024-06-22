import axios from 'axios';
import { instance } from './instance';

export const animeApi = {
    searchAnimeWithPagination(params, category) {
        return instance.get(category, {params});
    },
    getAllAnime(params) {
        return instance.get(`top/anime`, {params});
    },
    getAnime(id) {
        return instance.get(`anime/${id}/full`);
    },
    getAnimeInfo(id){
        return axios.get(`https://march-api1.vercel.app/meta/anilist/info/${id}?provider=gogoanime`)
    },
    getEpisodes(id){
        return axios.get(`https://march-api1.vercel.app/meta/anilist/info/${id}?provider=zoro`)
    }
};

import { instance } from './instance';

export const animeApi = {
    getAllAnime(params) {
        return instance.get(`top/anime`, { params });
    },
    getAnime(id) {
        return instance.get(`anime/${id}/full`);
    },
    getAnimeRank(params){
        return instance.get(`anime`, {params});
    },
    getAnimeSerch(params){
        return instance.get(`anime`, {params});
    },
    getAnimeRand(params){
        return instance.get(`random/anime`, {params});
    },
    getCharacters(id){
        return instance.get(`anime/${id}/characters`);
    },
};

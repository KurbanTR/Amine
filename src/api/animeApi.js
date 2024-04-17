import { instance } from './instance';

export const animeApi = {
    getAllAnime(params) {
        return instance.get(`top/anime`, { params });
    },
    getAnime(id) {
        return instance.get(`anime/${id}/full`);
    },
    getAnimeRank(){
        return instance.get(`anime/order_by=rank`);
    },
    getAnimeSerch(params){
        return instance.get(`anime`, {params});
    },
};

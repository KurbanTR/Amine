import { instance } from './instance';

export const animeApi = {
    getAllAnime(params) {
        return instance.get(`top/anime`, { params });
    },
    getAnime(id) {
        return instance.get(`anime/${id}/full`);
    },
    getAnimeRank(){
        return instance.get(`anime?order_by=rank&genres_exclude=${[12, 49]}`);
    },
    getAnimeSerch(params){
        return instance.get(`anime`, {params});
    },
};

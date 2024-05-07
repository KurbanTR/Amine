import { instance } from './instance';

export const animeApi = {
    searchAnimeWithPagination(params) {
        return instance.get(`anime`, {params});
    },
    getAllAnime(params) {
        return instance.get(`top/anime`, {params});
    },
    getAnime(id) {
        return instance.get(`anime/${id}/full`);
    },
    getScore(params){
        return instance.get(`anime`, {params});
    },
    getNow(){
        return instance.get(`seasons/now`);
    },
    getSerch(params){
        return instance.get(`anime`, {params});
    },
    getRand(params){
        return instance.get(`random/anime`, {params});
    },
    getCharacters(id){
        return instance.get(`anime/${id}/characters`);
    },
    getRecommendations(id){
        return instance.get(`anime/${id}/recommendations`);
    },
    getPerson(id){
        return instance.get(`people/${id}/full`);
    },
};

import { instance } from './instance';

export const mangaApi = {
    searchMangaWithPagination(params) {
        return instance.get(`manga`, {params});
    },
    getAllManga(params) {
        return instance.get(`top/manga`, { params });
    },
    getManga(id) {
        return instance.get(`manga/${id}/full`);
    },
    getSerch(params){
        return instance.get(`manga`, {params});
    },
    getRand(params){
        return instance.get(`random/manga`, {params});
    },
    getCharacters(id){
        return instance.get(`manga/${id}/characters`);
    },
    getRecommendations(id){
        return instance.get(`manga/${id}/recommendations`);
    },
};
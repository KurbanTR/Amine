import { instance } from './instance';

export const animeApi = {
    searchAnimeWithPagination(params, category) {
        return instance.get(category, {params});
    },
    getAllAnime(params, category) {
        return instance.get(`top/${category}`, {params});
    },
    getAnime(id, category) {
        return instance.get(`${category}/${id}/full`);
    },
    getRand(params, category){
        return instance.get(`random/${category}`, {params});
    },
    getCharacters(id, category){
        return instance.get(`${category}/${id}/characters`);
    },
    getRecommendations(id, category){
        return instance.get(`${category}/${id}/recommendations`);
    },
    getPerson(id){
        return instance.get(`people/${id}/full`);
    },
};

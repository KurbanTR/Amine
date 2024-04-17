import { instance } from './instance';

export const mangaApi = {
    getAllManga(params) {
        return instance.get(`top/manga`, { params });
    },
    getManga(id) {
        return instance.get(`manga/${id}/full`);
    },
    getMangaRank(){
        return instance.get(`manga/order_by=rank`);
    },
    getMangaSerch(params){
        return instance.get(`manga`, {params});
    },
};
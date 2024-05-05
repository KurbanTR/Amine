import { instance } from './instance';

export const charactersApi = {
    getAllCharacters(params){
        return instance.get(`top/characters`, {params});
    },
    getCharacter(id){
        return instance.get(`characters/${id}/full`);
    },
    getSerch(params){
        return instance.get(`characters`, {params});
    },
    getRand(){
        return instance.get(`random/characters`);
    },
};

import { instance } from './instance';

export const mainApi = {
    getScore(params){
        return instance.get(`anime`, {params});
    },
    getNow(){
        return instance.get(`seasons/now`);
    },
    getCharacters(){
        return instance.get(`characters`, {params:{page:1}});
    },
    getTopCharacters(){
        return instance.get(`top/characters`, {params:{page:1}});
    },
    getPerson(){
        return instance.get(`person`, {params:{page:1}});
    },
    getTopPerson(){
        return instance.get(`top/person`, {params:{page:1}});
    },
};
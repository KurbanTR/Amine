import axios from "axios";

export const mainApi = {
    getTrendingNow(){
        return axios.get(`https://march-api1.vercel.app/meta/anilist/trending`, {params: {perPage: 20}});
    },
    getPopular(){
        return axios.get(`https://march-api1.vercel.app/meta/anilist/popular`, {params: {perPage: 20}});
    },
    getUpcoming(){
        return axios.get(`https://march-api1.vercel.app/meta/anilist/advanced-search`, {params: {sort: '["POPULARITY_DESC"]', status: 'NOT_YET_RELEASED', perPage: 20}});
    },
    getBestScore(){
        return axios.get(`https://march-api1.vercel.app/meta/anilist/advanced-search`, {params: {sort: '["SCORE_DESC"]', perPage: 20}});
    }
};
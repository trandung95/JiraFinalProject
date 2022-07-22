import axios from 'axios'
//Cấu hình các hằng số của hệ thống 

//domain backend
export const DOMAIN = 'https://jiranew.cybersoft.edu.vn';
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNyIsIkhldEhhblN0cmluZyI6IjI2LzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2Njc0MjQwMDAwMCIsIm5iZiI6MTYzNzYwMDQwMCwiZXhwIjoxNjY2ODkwMDAwfQ.bsbyK5ZxphAvsyp2ZqB_XhppPE9tnzCxMpCoHby_Wc0';

export const USER_LOGIN = 'userLogin';
export const ACCESSTOKEN = 'accessToken';


//config axios 
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000,
});

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        ['TokenCybersoft']: TOKEN_CYBERSOFT,
        ['Authorization']: 'Bearer ' + localStorage.getItem(ACCESSTOKEN)
    }
    return config;
}, (errors) => {
    return Promise.reject(errors)
})
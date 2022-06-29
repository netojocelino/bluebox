import axios, { AxiosInstance } from 'axios'

const api = (api: string) => axios.create({
    baseURL: 'https://api.sendinblue.com/v3',
    headers: {
        'API-KEY': api,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

export default api

export type ApiConnection = AxiosInstance;

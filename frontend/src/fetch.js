import axios from 'axios'
import router from './router.js'
import AuthService from './services/AuthService.js'
import Vue from 'vue'
let loader
let activeRequests = 0

var axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

axiosInstance.interceptors.request.use(
    config => {
        if (!config.url.includes('/ping')) {
            if (activeRequests === 0) loader = Vue.$loading.show()
            activeRequests++
        }
        if (localStorage.getItem('token')) {
            config.headers.authorization = 'Bearer ' + localStorage.getItem('token')
        }
        return config
    },
    error => {
        if (!error.config.url.includes('/ping')) activeRequests--
        if (activeRequests === 0) {
            loader.hide()
        }
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    response => {
        if (!response.config.url.includes('/ping')) activeRequests--
        if (activeRequests === 0) {
            loader.hide()
        }
        return response
    },
    error => {
        if (!error.config.url.includes('/ping')) activeRequests--
        if (activeRequests === 0) {
            loader.hide()
        }
        const status = error.response.status
        if (status === 401) {
            AuthService.logout()
            router.push('/login')
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
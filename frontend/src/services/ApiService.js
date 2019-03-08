import fetch from '../fetch.js'
import qs from 'qs'

class ApiService {
    get (params) {
        Object.keys(params).forEach(key => {
            if (params[key] == '' || params[key] == null) delete params[key]
        });
        return fetch.get(`/${this.entity}`, {
            params,
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
        .then(response => {
            return {
                entities: response.data.data,
                count: response.data.count,
                pages: response.data.pages
            }
        })
    }

    find(id) {
        return fetch.get(`/${this.entity}/${id}`)
        .then(response => {
            return response.data
        })
    }

    create(data) {
        // remove empty keys
        Object.keys(data).forEach((key) => (data[key] === null || data[key] === '') && delete data[key]);
        return fetch.post(`/${this.entity}`, data)
        .then(response => {
            return response.data.message
        }).catch(err => {
            return Promise.reject(new Error(err.response.data.error))
        })
    }

    update(id, data) {
        // remove empty keys
        Object.keys(data).forEach((key) => (data[key] === null || data[key] === '') && delete data[key]);
        return fetch.patch(`/${this.entity}/${id}`, data)
        .then(response => {
            return response.data.message
        }).catch(err => {
            return Promise.reject(new Error(err.response.data.error))
        })
    }
}

export default ApiService
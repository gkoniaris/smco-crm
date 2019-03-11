import fetch from '../fetch.js'
import jwtDecode from 'jwt-decode'

class AuthService {
    constructor() {
        this.token = localStorage.getItem('token') || null
        this.user = this.token ? jwtDecode(this.token) : null
    }

    getUser () {
        return this.user
    }
 
    login (email, password) {
        return fetch.post('/login', {
            email,
            password
        }).then(response => {
            this.token = response.data.token
            localStorage.setItem('token', this.token)
            this.user = jwtDecode(this.token)
        }).catch(err => {
            return Promise.reject(err.response.data.error)
        })
    }

    signup (email, password, firstName, lastName) {
        return fetch.post('/signup', {
            email,
            password,
            firstName,
            lastName
        }).catch(err => {
            return Promise.reject(err.response.data.error)
        })
    }

    logout() {
        this.token  = null
        this.user = null
        localStorage.removeItem('token')
    }

    isAuthenticated() {
        return this.token != null
    }
}

export default new AuthService()
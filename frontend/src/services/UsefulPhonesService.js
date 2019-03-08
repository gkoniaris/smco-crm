import ApiService from './ApiService'

class UsefulPhoneService extends ApiService {
    constructor () {
        super()
        this.entity = 'usefulPhone'
    }
}

export default new UsefulPhoneService()
import ApiService from './ApiService'

class VisitService extends ApiService {
    constructor () {
        super()
        this.entity = 'visit'
    }
}

export default new VisitService()
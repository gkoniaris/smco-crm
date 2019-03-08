import ApiService from './ApiService'

class QuestionService extends ApiService {
    constructor () {
        super()
        this.entity = 'question'
    }
}

export default new QuestionService()
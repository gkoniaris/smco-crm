const QuestionService = require('../services/QuestionService')

class QuestionController {
    async find(req, res, next) {
        try {
            const question = await QuestionService.find(req.user.id, req.params.id)
            if (!question) {
                return res.status(404).json({error: 'Η ερώτηση δεν βρέθηκε'})
            }
            return res.json(question)
        } catch(err) { next(err) }
    }

    async get(req, res, next) {
        try {
            const {questions, count, pages} = await QuestionService.get(req.user.id, {sort: req.query.sort, order: req.query.order, page: req.query.page, clientId: req.query.clientId, status: req.query.status})
            return res.json({data: questions, count, pages})
        } catch(err) { next(err) }
    }

    async create(req, res, next) {
        try {
            const question = await QuestionService.create(req.body, req.user.id)
            return res.json({
                message: `Η ερώτηση ${question.id} δημιουργήθηκε επιτυχώς`
            })
        } catch(err) { next(err) }
    }

    async update(req, res, next) {
        try {
            await QuestionService.update(req.params.id, req.body, req.user.id)
            return res.json({
                message: `Η ερώτηση ενημερώθηκε επιτυχώς`
            })
        } catch(err) { next(err) }
    }
} 

module.exports = new QuestionController()
import ApiService from './ApiService'

class VisitService extends ApiService {
    constructor () {
        super()
        this.entity = 'visit'
    }

    update(id, data) {
        const appointments = data.appointments.map(appointment => {
            delete appointment.visitId
            delete appointment.createdAt
            delete appointment.updatedAt
            return appointment
        })
        data.appointments = appointments
        return super.update(id, data)
    }
}

export default new VisitService()
import ApiService from './ApiService'

class DeviceService extends ApiService {
    constructor () {
        super()
        this.entity = 'device'
    }
}

export default new DeviceService()
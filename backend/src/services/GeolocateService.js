const axios = require('axios')
const config = require('../config.js')

class GeolocateService {
    geolocateAddress (address) {
        return axios.get('http://dev.virtualearth.net/REST/v1/Locations', {
            params: {
                countryRegion: 'gr',
                addressLine: address,
                maxResults: 20,
                includeNeighborhood: 1,
                key: config.bingGeolocationKey
            }
        }).then(response => {
            const data = response.data.resourceSets[0].resources
            const mapped = data.filter(item => item.address != null && item.address.addressLine != null)
            .map(item => {
                const mapped = Object.assign({}, {
                    address: item.address.addressLine,
                    region: item.address.neighborhood,
                    city: item.address.adminDistrict,
                    postalCode: item.address.postalCode,
                    lat: item.geocodePoints[0].coordinates[0],
                    lon: item.geocodePoints[0].coordinates[1]
                })
                return mapped
            })
            return mapped
        })
    }
}

module.exports = new GeolocateService()

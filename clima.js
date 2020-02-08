const lugar = require('./lugar/lugar.js');
const clima = require('./clima/clima.js');

const getInfo = async(direccion) => {

    try {
        const place = await lugar.getLugarLatLng(direccion);
        const weather = await clima.getClima(place.lat, place.long);
        return {
            "place": place.direccion,
            "weather": weather
        }
    } catch (e) {
        throw new Error(`no se pudo determinar el clima de ${direccion}`);
    }
}

module.exports = {
    getInfo
}
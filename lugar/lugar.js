const axios = require('axios');

const getLugarLatLng = async(address) => {

    const encodeURL = encodeURI(address);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeURL}`,
        headers: { 'X-RapidAPI-Key': '6fa720e231msh1848a74cb3d161dp15c373jsn897b267d8fb5' }
    });

    const resp = await instance.get();
    const data = resp.data.Results;

    if (data.length === 0) {
        throw new Error(`No hay resultados para ${encodeURL}`);
    }

    const direccion = data[0].name;
    const lat = data[0].lat;
    const long = data[0].lon;

    return {
        direccion,
        lat,
        long
    }
}

module.exports = {
    getLugarLatLng
}
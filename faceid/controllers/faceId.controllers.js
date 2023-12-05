const faceIdCtrl = {};

// kairos controller
const kairosCtrl = require('./kairos.controllers');

// exceptions
const StandarException = require('../exception/StandarException');
const codigos = require("../exception/codigos");

faceIdCtrl.validarImagenes = async (urlId = '', urlsSelf = ['']) => {
    const validUrlId = validarUrl(urlId);
    const validUrlSelf = validarUrlArray(urlsSelf);

    if (!validUrlId) {
        return new StandarException("El url del id no es una url valida", codigos.bodyNoValido);
    }

    if (validUrlSelf.length == 0) {
        return new StandarException("El url de la self no es una url valida", codigos.bodyNoValido);
    }

    const nombre = 'id_usuario';
    const cargarId = await kairosCtrl.enroll(urlId, nombre);
    if (cargarId instanceof StandarException) {
        return cargarId;
    }

    const resultados = [];
    for (let url of validUrlSelf) {
        const comparar = await kairosCtrl.verify(url, nombre);
        if (comparar instanceof StandarException) {
            
        } else {
            if(comparar !== undefined && Object.keys(comparar).length > 0 && comparar.images){
                resultados.push({
                    resultado: comparar.images[0].transaction.confidence,
                    url: url
                });
            } else {
                resultados.push({
                    resultado: comparar,
                    estatus:"Sin resultado",
                    url: url
                });
            }
        }
    }

    return {
        roll: cargarId,
        verify: resultados
    }
}

faceIdCtrl.galerias = async () => {
    const galerias = await kairosCtrl.verGaleria();
    return galerias
}

validarUrlArray = (urls = ['']) => {
    const validUls = [];
    for (let url of urls) {
        if (validarUrl(url)) {
            validUls.push(url);
        }
    }
    return validUls;
}

validarUrl = (url = '') => {
    if (url.includes('http')) {
        return true;
    }

    if (url.includes('https')) {
        return true;
    }

    if (url.includes('gs:')) {
        return true;
    }
    return false;
}

module.exports = faceIdCtrl;
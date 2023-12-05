const requestPromise = require("request-promise");

const kairosCtrl = {};

// Exceptions
const StandarException = require('../exception/StandarException');
const codigos = require("../exception/codigos");

// conf kairos
const kairosUrl = 'https://api.kairos.com';
const appkey = "cc9857fd54f9cbcc7d233a7cd27e34d8";
const appId = "7972d3da";
const gallery = 'FaceID';
const headers = {
    app_id: '' + appId,
    app_key: '' + appkey
};

/**
 * @description Encuentra los rostros en la imagen y la almacena en una galeria.
 * mas información en : https://www.kairos.com/docs/api/#post-enroll
 * @param url URL de acceso público, carga de archivos o foto codificada en Base64
 * @param nombre nombre para identificar el rostro.
 * @returns images: [{...}] , face_id: '...' 
 */
kairosCtrl.enroll = async(url = "", nombre = "") => {
    const kairos = await requestPromise.post({
        uri: '' + kairosUrl + '/enroll',
        headers: headers,
        body: {
            image: '' + url,
            subject_id: '' + nombre,
            gallery_name: '' + gallery
        },
        json: true
    }).then(data => {
        const resultado = {
            images: data.images,
            face_id: data.face_id
        }
        return resultado;
    }).catch(err => {
        return new StandarException("Error al encontrar los rostros en la imagen", codigos.datosNoEncontrados, err);
    });
    return kairos;
}


/**
 * @description Encuentra el rostro en la imagen, e intenta compararla con una imagen en la galeria.
 * mas información en : https://www.kairos.com/docs/api/#post-verify
 * @param url URL de acceso público, carga de archivos o foto codificada en Base64
 * @param nombre nombre del rostro existente en galeria para realizar la comparacion.
 * @returns images: [{...}]
 */
kairosCtrl.verify = async (url = "", nombre = "") => {
    const kairos = await requestPromise.post({
        uri: '' + kairosUrl + '/verify',
        headers: headers,
        body: {
            image: '' + url,
            subject_id: '' + nombre,
            gallery_name: '' + gallery
        },
        json: true
    }).then(data => {
        const resultado = {
            images: data.images,
            face_id: data.face_id
        }
        return resultado;
    }).catch(err => {
        return new StandarException("Error al comparar los rostros", codigos.validacionIncorrecta, err);
    });
    return kairos;
}

/**
 * @description Lista los rostros de la galeria IDue.
 * mas información en : https://www.kairos.com/docs/api/#post-galleryview
 * @returns status: '...', subject_ids: ['...']
 */
kairosCtrl.verGaleria = async () => {
    const kairos = await requestPromise.post({
        uri: '' + kairosUrl + '/gallery/view',
        headers: headers,
        body: {
            gallery_name: '' + gallery
        },
        json: true
    }).then(data => {
        const listado = {
            status: data.status,
            subject_ids: data.subject_ids
        }
        return listado;
    }).catch(err => {
        return new StandarException("No hay galerias", codigos.validacionIncorrecta, err);
    });
    return kairos;
}
module.exports = kairosCtrl;
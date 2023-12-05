// imports de modulo express y router
const express = require('express');
const router = express.Router();

// import de controller
const faceIdCtrl = require('../controllers/faceId.controllers');

// import de middleware
const faceId_dto = require('./dto/faceId.dto');

// import de exceptions
const StandarException = require('../exception/StandarException');

router.post('/', faceId_dto.validarDto, async(req, res, next) => {
    const urlId = req.body.urlId;
    const urlSelf = req.body.urlSelf;

    const resultado = await faceIdCtrl.validarImagenes(urlId, urlSelf);
    if (resultado instanceof StandarException) {
        next(resultado);
        return;
    }
    res.json({ estatus: true, validar: resultado.verify});
});

// export del modulo router
module.exports = router;
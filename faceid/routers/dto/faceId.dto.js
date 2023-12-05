/**
 * @name middleware Data Transfer Objects
 * @description Valida que dentro del body de las peticiones post y put, tengan los campos requeridos.
 * @author IIB
 */

const express = require('express');
const app = express();

const faceId_dto = {};

faceId_dto.validarDto = (req, res, next) => {
    // Define los campos requeridos en un arreglo
    const camposRequeridos = ['urlId', 'urlSelf'];

    // Verifica que los campos requeridos estén presentes
    if (!camposRequeridos.every(campo => campo in req.body)) {
        return res.status(400).json({ estatus: false, faceId: 'Campos faltantes' });
    }

    // Si todo está bien, pasa al siguiente middleware o ruta
    next();
}

module.exports = faceId_dto;
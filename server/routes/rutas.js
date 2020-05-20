const express = require('express');
const router = express.Router();
const socket = require('../bin/www');



router
    .route('/mensajes')
    .get((req, res) => {
        res.json({
            ok: true,
            mensaje: 'Todo esta bien!'
        });
    })
    .post((req, res) => {
        let { cuerpo, de } = req.body;
        let payload = { cuerpo, de };
        socket.io.emit('mensaje-nuevo', payload);

        res.json({
            ok: true,
            cuerpo,
            de
        })
    });
router
    .route('/mensajes/:id')
    .post((req, res) => {

        let { cuerpo, de } = req.body;
        let { id } = req.params;
        let payload = { cuerpo, de };

        socket.io.in(id).emit('mensaje-privado', payload);

        res.json({
            ok: true,
            cuerpo,
            de,
            id
        });
    })




module.exports = router;
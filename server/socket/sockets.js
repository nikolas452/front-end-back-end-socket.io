const { io } = require('../bin/www');

const usuariosLista = require('../models/usuarios-lista');
const usuariosConectados = new usuariosLista();
const Usuario = require('../models/usuario');


io.on('connection', (client) => {
    console.log('Cliente conectado:', client.id);

    //Conectar cliente
    const usuario = new Usuario(client.id);
    usuariosConectados.agregar(usuario);

    client.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
    // Configurar un usuario
    client.on('configurar-usuario', (payload, callback) => {
        usuariosConectados.actualizarNombre(client.id, payload.nombre);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
    // Cuando un usuario se desconecta
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.deleteUsuario(client.id);
    });

});
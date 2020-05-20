class UsuarioLista {
    constructor() {
        this.lista = new Array();
        // this.lista = [];
    }
    agregar(Usuario) {
        this.lista.push(Usuario);
        console.log(this.lista);
        return Usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('==== Actualizando usuario ======');
        console.log(this.lista);
    }
    getLista() {
        return this.lista;
    }
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    deleteUsuario(id) {
        const auxUser = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id != id);
        return auxUser;
    }

}

module.exports = UsuarioLista;
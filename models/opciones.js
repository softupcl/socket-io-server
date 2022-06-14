const Opcion = require('./opcion');

class Opciones {
    constructor() {
        this.opciones = [];
    }

    agregarOpcion(opcion = new Opcion(nombre = '')) {
        this.opciones.push(opcion);
    }

    obtenerOpciones() {
        return this.opciones;
    }

    borrarOpcion(id = '') {
        this.opciones = this.opciones.filter(opcion => opcion.id !== id);
        return this.opciones;
    }

    votoOpcion(id = '') {
        this.opciones = this.opciones.map(opcion => {
            if (opcion.id === id) {
                opcion.votos++;
                return opcion;
            } else {
                return opcion;
            }
        });
    }
}

module.exports = Opciones;
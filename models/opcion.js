const { v4: uuidV4 } = require('uuid');

class Opcion {
    constructor(nombre = 'sin-nombre') {
        this.id = uuidV4();
        this.nombre = nombre;
        this.votos = 0;
    }
}

module.exports = Opcion;
const { io } = require('../index');
const Opcion = require('../models/opcion');
const Opciones = require('../models/opciones');


const opciones = new Opciones();

opciones.agregarOpcion(new Opcion('Radiohead'));
opciones.agregarOpcion(new Opcion('Lucybell'));
opciones.agregarOpcion(new Opcion('Saiko'));
opciones.agregarOpcion(new Opcion('Muse'));

console.log(opciones);


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('opciones-activas', opciones.obtenerOpciones());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    client.on('voto-opcion', (payload) => {
        opciones.votoOpcion(payload.id);
        io.emit('opciones-activas', opciones.obtenerOpciones());
    });

    client.on('agregar-opcion', (payload) => {
        const nuevaOpcion = new Opcion(payload.nombre);
        opciones.agregarOpcion(nuevaOpcion);
        io.emit('opciones-activas', opciones.obtenerOpciones());
    });

    client.on('borrar-opcion', (payload) => {
        opciones.borrarOpcion(payload.id);
        io.emit('opciones-activas', opciones.obtenerOpciones());
    });



    /*  client.on('emitir-mensaje', (payload) => {
         //io.emit('nuevo-mensaje', payload); //emite a todos los conectadoos
         client.broadcast.emit('nuevo-mensaje', payload); //Emite a todos menos el que envio el mensje
     }); */
});
/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const almacenSchema = new Schema({
    idPersona: {
    type: mongoose.Types.ObjectId,
    ref: 'usuario',
    requiered: [true, 'Favor de ingresar un identificador unico de persona.']
}, 
    idProducto: {
    type: mongoose.Types.ObjectId,
    ref: 'producto',
    requiered: [true, 'Favor de ingresar un identificador unico del producto.']
},
 dteFechaCompra: {
    type: Date,
    required: [true, 'Favor de insertar la fecha del almacen']
 },
    nmbPrecio: Number     
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "almacen"
});

module.exports = mongoose.model('Compra', compraSchema);


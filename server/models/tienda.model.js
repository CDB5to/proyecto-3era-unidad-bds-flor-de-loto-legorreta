/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const compraModel = require('./compra.model');

const tiendaSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Favor de insertar el nombre de la tienda.']
    },
    strDireccion: {
        type: String,
        required: [true, 'Favor de insertar la direccion.']
    },
    strTelefono: String,
    strUrlWeb: String,
    arrAnimalitos: [{
        type: mongoose.Types.ObjectId,
        ref : 'mascota'
    }], //Creacion de un array de Id's
ajsnCompra: [compraModel.Schema], //Creacion de un array de Json
    blnActivo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "tienda"
});

module.exports = mongoose.model('Tienda', tiendaSchema);
/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Favor de insertar el nombre del producto.']
    },
    strTipoProducto: {
        type: String,
        required: [true, 'Favor de insertar que tipo de producto es.']
    },
    intEdad: Number,
    strSexo: String,
    blnActivo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "producto"
});

module.exports = mongoose.model('Producto', productoSchema);
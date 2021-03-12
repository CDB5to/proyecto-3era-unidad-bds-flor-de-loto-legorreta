/*jshint esversion: 9*/
const MascotaModel = require('../../models/mascota.model');
const Helper = require("../../libraries/helper");
const express = require('express');
const app = express();

// http://localhost:3000/api/mascota/
app.get('/', async(req, res) => {
    try {
        if (req.query.idProducto) req.queryMatch._id = req.query.idProducto;
        if (req.query.termino) req.queryMatch.$or = Helper(["strNombre"], req.query.termino);

        const producto = await ProductoModel.find({...req.queryMatch });

        if (producto.length <= 0) {
            res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'No se encontraron mascotas en la base de datos.',
                cont: {
                    producto
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion obtenida correctamente.',
                cont: {
                    producto
                }
            });
        }
    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al obtener el producto.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

// http://localhost:3000/api/mascota/
app.post('/', async(req, res) => {
    try {

        const producto = new ProductoModel(req.body);

        let err = producto.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar el producto.',
                cont: {
                    err
                }
            });
        }


        const nuevaProducto = producto.save();
        if (nuevaProducto.length <= 0) { 
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se pudo registrar el producto la base de datos.',
                cont: {
                    nuevaProducto
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Success: Informacion insertada correctamente.',
                cont: {
                    nuevaProducto
                }
            });
        }
    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al registrar el producto.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

app.put('/', async(req, res) => {
    try {

        const idcompra = req.query.idProducto;

        if(req.query.idProducto == '') {
        return res.status(400).send({
            estatus: '400',
            err: true,
            msg: 'Error: No se envió un id valido.',
            cont: 0
        });
    } 
    
        req.body._id = idcompra;
        const productoEncontrada = await ProductoModel.findById(idCompra);

        if(!productoEncontrada)
        return res.status(404).send({
            estatus: '404',
            err: true,
msg: 'Error: No se encontro la mascota en la base de datos.',
            cont: productoEncontrada
        });

    const newCompra = new ProductoModel(req.body);        

            let err = newCompra.validate.Sync();

            if (err) {
            return res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'Error: Error al insertar la producto.',
            cont: {
                err
            }
        });    
    }
    
    console.log(newCompra);

    const animalitoActualizado = await MascotaModel.findByIdAndUpdate(idAnimalito, { $set: {strTipoAnimal: newAnimalito.strTipoAnimal, strNombre: newAnimalito.strNombre } }, {new: true });

    if(!animalitoActualizado) {
        return res.status(400).json({
            ok: false,
            resp: 400,
            msg: 'Error: Al intentar actualizar la compra.',
            cont: 0
         });    
    } else {
        return res.status(200).json({
            ok: true,
            resp: 200,
            msg: 'Success: Se actualizo el animalito correctamente.',
            cont: {
                animalitoActualizado
            }
        });
    }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al actualizar la mascota.',
            cont: {
                err: Ocject.keys(err).length === 0 ? err.message : err
            }    
        });
    }
});

app.delete('/', async(req, res) => {

    try {

        if(req.query.idMascota == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envió un id valido.',
                cont: 0
            });
        } 
        
        idMascota = rea.query.idMascota;
        binActivo = req.body.binActivo;

            const mascotaEncontrada = await MascotaModel.findById(idAnimalito);
    
            if(!mascotaEncontrada)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro la mascota en la base de datos.',
                cont: mascotaEncontrada
            });

    const animalitosActualizado = await MascotaModel.findByIdAndUpdate(idAnimalito, { $set: { binActivo }}, { new: true });

          if (!animalitoActualizado) {
                return res.status(400).json({
                    ok: false,
                    resp: 400,
                    msg: 'Error: Al intentar eliminar el animalito.',
                    cont: 0
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    resp: 200,
                    msg: `Success: Se a {blnActivo === 'true'? 'activado': 'Eliminado'} el animalito correctamente.`,
                    cont: {
                            animalitoActualizado
                    }
                });
            }


          } catch (err) {
              res.status(500).send({
                  estatus: '500',
                  err: true,
                msg: 'Error: Error al eliminar la mascota.',
                  cont: {
                    err: Ocject.keys(err).length === 0 ? err.message : err
            }    
        });
    }           
});

module.exports = app;

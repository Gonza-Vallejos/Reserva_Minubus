const { Localidad } = require('../models');
const { Provincia } = require('../models');

exports.obtenerLocalidades = async (req, res) => {
    try {
        const localidades = await Localidad.findAll({
            attributes: ['id','nombre', 'provincia_id'] 
        });
        res.status(200).json(localidades);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las localidades' });
    }
};

exports.obtenerProvincias = async (req, res) => { 
    try {
        const provincias = await Provincia.findAll({
            attributes: ['id','nombre','pais_id'] 
        });
        res.status(200).json(provincias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las provincias' });
    }
};

exports.obtenerLocalidadesId = async (req, res) => {
    try {
        const localidades = await Localidad.findAll({
            where: { id: req.params.id },
            attributes: ['id','nombre', 'provincia_id'] 
        });
        res.status(200).json(localidades);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las localidades' });
    }
};

exports.obtenerProvinciasId = async (req, res) => { 
    try {
        const provincias = await Provincia.findAll({
            where: { id: req.params.id },
            attributes: ['id','nombre','pais_id'] 
        });
        res.status(200).json(provincias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las provincias' });
    }
};

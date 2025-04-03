const { Viajes } = require('../models');  

exports.obtenerViajesDisponibles = async (req, res) => {
    try {
        const fechaActual = new Date();
        
        console.log('***ver fecha actual****', fechaActual.toLocaleString());
        console.log('***ver fecha actual****', fechaActual.toLocaleDateString());
        console.log('***ver fecha actual****', fechaActual.toISOString());
        
        
        const { origen, destino } = req.body;
       
        if (!origen || !destino) {
            return res.status(400).json({ error: 'Por favor, proporciona tanto el origen como el destino.' });
        }

        const todosLosViajes = await Viajes.findAll({
            attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio', 'chofer', 'medioTransporte_id', 'eliminado' ]
        });

        const viajesDisponibles = todosLosViajes.filter(viaje => {
            const fechaViaje = new Date(viaje.fechaViaje);
            const horariosalida = new Date(viaje.horarioSalida);
            
            
           
            // Filtrar por fecha actual o posterior y por coincidencia de origen y destino
            return fechaViaje >= fechaActual &&
            viaje.origenLocalidad === origen &&
            viaje.destinoLocalidad === destino &&
            viaje.eliminado === "no" && 
            (fechaViaje > fechaActual || // Si la fecha es futura, pasa automáticamente
            (horariosalida.getHours() > fechaActual.getHours() || // Si la hora es mayor, pasa
            (horariosalida.getHours() === fechaActual.getHours() && // Si la hora es igual, compara los minutos
            horariosalida.getMinutes() >= fechaActual.getMinutes())));
 });
       

        if (viajesDisponibles.length === 0) {
            return res.status(404).json({ error: 'No hay viajes disponibles para el origen y destino especificados.' });
        }
        
       // Verificar y mostrar el campo `eliminado` en la consola
       viajesDisponibles.forEach(viaje => {
        console.log('************ver eliminado********', viaje.eliminado);
       
    });

        res.status(200).json(viajesDisponibles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los viajes disponibles' });
    }
};

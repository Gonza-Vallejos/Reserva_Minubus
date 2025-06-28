const { Viajes } = require('../models');  

exports.obtenerViajesDisponibles = async (req, res) => {
    try {
        const fechaActual = new Date();
        
        const { origen, destino } = req.query;
       
        if (!origen || !destino) {
            return res.status(400).json({ error: 'Por favor, proporciona tanto el origen como el destino.' });
        }

        const todosLosViajes = await Viajes.findAll({
            attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio', 'usuarioEmpresa_id', 'medioTransporte_id', 'eliminado' ]
        });

        const viajesDisponibles = todosLosViajes.filter(viaje => {
            const fechaViaje = new Date(viaje.fechaViaje);
            const horariosalida = viaje.horarioSalida;

            const horaActualMinutos = fechaActual.getHours() * 60 + fechaActual.getMinutes();

            const [h, m, s] = horariosalida.split(':').map(Number);
            const horaStrMinutos = h * 60 + m;


          function limpiarHoraUTC(fecha) {
                const isoStr = fecha.toISOString(); // ejemplo: "2025-06-27T00:00:00.000Z"
                const [anio, mes, dia] = isoStr.substring(0, 10).split('-');
                return new Date(Number(anio), Number(mes) - 1, Number(dia));
                }


                const fechaActualLimpia = limpiarHoraUTC(new Date());
                const fechaViajeLimpia = limpiarHoraUTC(new Date(viaje.fechaViaje));

             const fechaActualSoloFecha = new Date(
                    fechaActual.getFullYear(),
                    fechaActual.getMonth(),
                    fechaActual.getDate()
                    );

                const fechaViajeSoloFecha = new Date(
                fechaViaje.getFullYear(),
                fechaViaje.getMonth(),
                fechaViaje.getDate()
                );

        console.log('ver fecha actual convertida',fechaActualSoloFecha);
        console.log('ver fecha viaje convertida', fechaViajeSoloFecha)
        console.log('ver fecha viaje', fechaViaje)

         console.log('ver fecha actual limpia',fechaActualLimpia);
        console.log('ver fecha viaje limpia', fechaViajeLimpia)
    // console.log('ver tipo de dato horaActualMinutos',typeof fechaViaje);
      //   console.log('ver hora salidad en minutos',horaStrMinutos);
        //  console.log('ver hora actual en minutos',horaActualMinutos);

           
            const horaActualAdelantada = horaActualMinutos + 120
           // console.log('ver hora actual adelantada en minutos',horaActualAdelantada);
           // console.log('ver tipo de dato hora salidad',typeof viaje.horarioSalida);
            //console.log('ver viajes viaje', fechaViaje)
             // console.log('ver viajes actual', fechaActual)
              // console.log('ver viajes fecha actual hours', fechaActual.getHours())
              // console.log('ver viajes horario minutes', horariosalida.getMinutes())
                 //  console.log('ver viajes horario.salida', viaje.horarioSalida)

           
            // Filtrar por fecha actual o posterior y por coincidencia de origen y destino
            return fechaViajeLimpia >= fechaActualLimpia &&
            viaje.origenLocalidad === origen &&
            viaje.destinoLocalidad === destino &&
            viaje.eliminado === "no" && 
            (fechaViajeLimpia > fechaActualLimpia || // Si la fecha es futura, pasa automáticamente
            (horaStrMinutos >= horaActualAdelantada ));
 });
       

        if (viajesDisponibles.length === 0) {
            return res.status(404).json({ error: 'No hay viajes disponibles para el origen y destino especificados.' });
        }
        
       // Verificar y mostrar el campo `eliminado` en la consola
       viajesDisponibles.forEach(viaje => {
        
       
    });

        res.status(200).json(viajesDisponibles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los viajes disponibles' });
    }
};

"use strict";
const apiUrl = 'https://api.openf1.org/v1';
const pitUrl = `${apiUrl}/pit`;
const driversUrl = `${apiUrl}/drivers`;
const queryParams = {
    session_key: '9102'
};
// Construye la cadena de consulta evitando codificar 'speed'
const queryString = Object.entries(queryParams)
    .map(([key, value]) => (key === 'speed' ? `${key}${value}` : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`))
    .join('&');
const fullPitUrl = `${pitUrl}?${queryString}`;
console.log('URL completa:', fullPitUrl);
// Realiza la solicitud para obtener la información de los pilotos
fetch(driversUrl)
    .then(response => response.json())
    .then((driversData) => {
    // Mapa para almacenar nombres de pilotos por número
    const pilotosNombres = {};
    // Llenar el mapa con los datos de los pilotos
    for (const driverData of driversData) {
        const pilotoNumero = driverData.driver_number;
        const pilotoNombre = `${driverData.full_name}`;
        pilotosNombres[pilotoNumero] = pilotoNombre;
    }
    // Realizar la solicitud para obtener las paradas
    fetch(fullPitUrl)
        .then(response => response.json())
        .then((paradas) => {
        // Función para sumar la duración de las paradas por piloto
        const sumarDuracionPorPiloto = (paradas) => {
            const sumaPorPiloto = {};
            for (const parada of paradas) {
                const piloto = parada.driver_number;
                const duracion = parada.pit_duration;
                // Si el piloto ya tiene una suma, la actualizamos; de lo contrario, inicializamos la suma
                sumaPorPiloto[piloto] = (sumaPorPiloto[piloto] || 0) + duracion;
            }
            return sumaPorPiloto;
        };
        // Llamamos a la función y obtenemos la suma por piloto
        const sumaPorPiloto = sumarDuracionPorPiloto(paradas);
        // Filtrar pilotos con menos de 50 segundos en la duración del pit stop
        const pilotosMenosDe50Segundos = Object.fromEntries(Object.entries(sumaPorPiloto)
            .filter(([piloto, duracion]) => duracion < 50));
        // Obtener nombres completos de los pilotos que cumplen con la condición
        const nombresCompletos = Object.fromEntries(Object.entries(pilotosMenosDe50Segundos)
            .map(([piloto]) => [piloto, pilotosNombres[Number(piloto)]]));
        // Imprimir los resultados
        console.log('Nombres completos de pilotos con menos de 50 segundos:', nombresCompletos);
    })
        .catch(error => console.error('Error en la solicitud de paradas:', error));
})
    .catch(error => console.error('Error en la solicitud de pilotos:', error));

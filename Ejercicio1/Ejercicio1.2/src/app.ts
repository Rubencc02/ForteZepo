//Al igual que la anterior buscamos los pilotos de España, en la sesion 9102 que es la carrera del circuito de Barcelona de 2023
//Esto lo hacemos para que no salga el nombre de todos los pilotos españoles en todas las sesiones. 

const apiUrl = 'https://api.openf1.org/v1/drivers';
const queryParams = {
    country_code: 'ESP',
    session_key: '9102'
};

// Construye la cadena de consulta evitando codificar 'speed'
const queryString = Object.entries(queryParams)
    .map(([key, value]) => (key === 'speed' ? `${key}${value}` : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`))
    .join('&');

const fullUrl = `${apiUrl}?${queryString}`;

console.log('URL completa:', fullUrl);

fetch(fullUrl)
    .then(response => response.json())
    .then(jsonContent => console.log(jsonContent))
    .catch(error => console.error('Error:', error));
interface Piloto {
    first_name: string;
    last_name: string;
}

const apiUrl = 'https://api.openf1.org/v1/drivers';
const queryParams = {
    country_code: 'FIN'
    //session_key: '9102'
};

// Construye la cadena de consulta evitando codificar 'speed'
const queryString = Object.entries(queryParams)
    .map(([key, value]) => (key === 'speed' ? `${key}${value}` : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`))
    .join('&');

const fullUrl = `${apiUrl}?${queryString}`;

console.log('URL completa:', fullUrl);


fetch(fullUrl)
    .then(response => response.json())
    .then((pilotos: Piloto[]) => {
        // Filtra los pilotos que tienen 'kk' en su nombre o apellido
        const pilotosConKK = pilotos.filter((piloto: Piloto) =>
            (piloto.first_name.toLowerCase().includes('v') || piloto.last_name.toLowerCase().includes('kk'))
        );

        // Imprime los resultados
        console.log('Pilotos finlandeses con "kk" en su nombre o apellido:', pilotosConKK);
    })
    .catch(error => console.error('Error:', error));

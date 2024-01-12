import express from 'express';
import Singleton from './Singleton'

const app = express();
const port = 3000;

// Obtén la instancia del Singleton
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

// Prueba de igualdad de instancias
const areInstancesEqual = instance1 === instance2;

// Rutas de prueba
app.get('/', (req, res) => {
  // Usa el Singleton para escribir en la consola
  instance1.logMessage('Mensaje desde la instancia 1');
  instance2.logMessage('Mensaje desde la instancia 2');

  // Muestra en la consola si las instancias son iguales o no
  console.log('¿Las instancias son iguales?', areInstancesEqual);

  res.send('Consulta la consola para ver los mensajes y la comparación de instancias.');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Singleton_1 = __importDefault(require("./Singleton"));
const app = (0, express_1.default)();
const port = 3000;
// Obtén la instancia del Singleton
const instance1 = Singleton_1.default.getInstance();
const instance2 = Singleton_1.default.getInstance();
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

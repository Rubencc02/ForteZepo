"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Singleton {
    constructor() {
        // Evitar la creación de instancias directamente desde fuera de la clase
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    logMessage(message) {
        console.log(message);
    }
}
exports.default = Singleton;

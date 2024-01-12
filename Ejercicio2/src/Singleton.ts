class Singleton {
    private static instance: Singleton;
  
    private constructor() {
      // Evitar la creación de instancias directamente desde fuera de la clase
    }
  
    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }
  
    public logMessage(message: string): void {
      console.log(message);
    }
  }
  
  export default Singleton;
  
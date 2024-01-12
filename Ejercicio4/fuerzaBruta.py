#!/usr/bin/env python3

import itertools
from multiprocessing import Process, Value

def probar_rango_caracteres(inicio, fin, password, intentos, encontrado):
    # 26 letras minúsculas, todas las posibles en la contraseña.
    caracteres = "abcdefghijklmnopqrstuvwxyz"

    # Se prueban todas las combinaciones de caracteres de longitud entre inicio y fin.
    # Se hace gracias a intertools.product, que nos devuelve todas las combinaciones posibles.
    for longitud in range(inicio, fin + 1):
        for combinacion in itertools.product(caracteres, repeat=longitud):
            intentos.value += 1
            intento = ''.join(combinacion)
            if intento == password:
                #Si se ha descifrado correctamente, se actualiza la bandera y se muestra la contraseña.
                encontrado.value = True
                print(f"Contraseña encontrada en {intentos.value} intentos. La contraseña es {intento}.")
                return

def bruteforce_attack(password, num_procesos):
    # Se crean dos objetos Value para compartir entre procesos.
    intentos = Value('i', 0)
    encontrado = Value('b', False)

    # Se calcula el rango de caracteres que va a probar cada proceso.
    longitud_password = 10
    num_procesos = int(num_procesos)
    rango_por_proceso = longitud_password // num_procesos

    # Se crean los procesos.
    procesos = []
    for i in range(num_procesos):
        inicio = i * rango_por_proceso + 1
        fin = (i + 1) * rango_por_proceso
        if i == num_procesos - 1:
            fin = longitud_password
        # Cada uno de los procesos va a probar las contraseñas del rango [inicio, fin], a través del probar_rango_caracteres.
        proceso = Process(target=probar_rango_caracteres, args=(inicio, fin, password, intentos, encontrado))
        procesos.append(proceso)
        proceso.start()

    # Se espera a que terminen todos los procesos.
    for proceso in procesos:
        proceso.join()

if __name__ == '__main__':
    # Se pide la contraseña y el número de procesos.
    password_input = input("Ingrese la contraseña: ")
    num_procesos_input = input("Ingrese el número de procesos: ")

    bruteforce_attack(password_input, num_procesos_input)

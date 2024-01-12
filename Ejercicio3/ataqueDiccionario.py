#!/usr/bin/env python3

# Diccionario de contraseñas comunes
common_passwords = ["password", "password123", "letmein", "qwerty", "123456", "abc123", "admin", "welcome", "monkey", "sunshine"]

# Diccionario de variaciones de contraseña
password_variations = ["", "123", "1234", "12345", "123456", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "/", "\\", "|", "[", "]", "{", "}", "<", ">"]

# Lista de combinaciones
combinaciones = []

def generar_combinaciones():

    for common_password in common_passwords:
        for variation in password_variations:
            combinaciones.append(common_password + variation) # Combinaciones hacia adelante
            combinaciones.append(variation + common_password) # Combinaciones hacia atrás

    for common_password in common_passwords:
        for common_password2 in common_passwords:
            combinaciones.append(common_password + common_password2) # Combinaciones de dos palabras
    
    for password_variation in password_variations:
        for password_variation2 in password_variations:
            combinaciones.append(password_variation + password_variation2) # Combinaciones de dos variaciones

    return combinaciones

def verificar_contraseña(usuario_input):
    # Verificar si la contraseña se encuentra entre los diccionarios, si es así, devolver True.
    # Contamos las combinaciones probadas para mostrarlas al final.
    contador = 0
    for contraseña in generar_combinaciones():
        contador += 1
        print("Probando contraseña: {}".format(contraseña))
        if contraseña == usuario_input:
            return True
    print("Se probaron {} contraseñas.".format(contador))
    return False

if __name__ == '__main__':
    # Pedimos la contraseña al usuario y la verificamos.
    
    usuario_input = input("Ingrese una contraseña: ")

    if verificar_contraseña(usuario_input):
        print("¡Contraseña encontrada!")
    else:
        print("Contraseña no encontrada.")

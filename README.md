# FuncionLlamadas
Una aplicación de React Native que permite a los usuarios realizar llamadas telefónicas a números ingresados manualmente o seleccionados de la lista de contactos del dispositivo. La aplicación también filtra automáticamente el prefijo de México (+52) en los números de contacto.

# Características
Llamadas Telefónicas: Permite hacer llamadas ingresando manualmente un número de 10 dígitos o seleccionando un contacto.
Selección de Contactos: Muestra la lista de contactos del dispositivo y permite seleccionar uno para obtener su número.
Compatibilidad con Prefijo Mexicano (+52): Si un número de contacto tiene el prefijo +52, este se elimina automáticamente, dejando solo los 10 dígitos.
Validación de Números: Acepta números de 10 dígitos o aquellos con el formato +52 seguido de 10 dígitos.

# Instalación
   # Requisitos Previos
Node.js
Expo CLI (se puede instalar con npm install -g expo-cli)
Dispositivo físico o emulador con Expo Go instalado

git clone https://github.com/tu-usuario/FuncionLlamadas.git
cd marcador-telefonico

# Instalar dependencias
 npm install

 # Instalar expo
 npx expo install expo-contacts

# Iniciar 
npx expo start

# USO
Uso
Abre la aplicación en Expo Go en tu dispositivo.
Ingresar Manualmente el Número:
Ingresa un número de 10 dígitos en el campo de entrada y presiona "Llamar".
Seleccionar Contacto:
Presiona "Seleccionar Contacto" para abrir la lista de contactos del dispositivo.
Elige un contacto; si el número tiene prefijo +52, se eliminará automáticamente.
Realizar la Llamada:
Una vez que el número está ingresado o seleccionado, presiona "Llamar".

# Archivos Principales
App.js: Contiene la lógica de la aplicación y la interfaz de usuario.
styles: Define los estilos de la interfaz de la aplicación.

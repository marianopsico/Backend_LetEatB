# Backend_LetEatB

Es el desarrollo de la API RESTful (Representational State Transfer), es decir, una arquitectura de servicios web que utiliza los principios y protocolos
de HTTP para proporcionar interoperabilidad y comunicación entre sistemas, en este caso enviando y recibiendo datos en formato JSON para realizar la 
gestion completa de usuarios y restaurantes

¿Pero que es un API?
Una API (Application Programming Interface) es un conjunto de reglas y protocolos que permite que diferentes aplicaciones se comuniquen entre sí. 
En el contexto de una API RESTful, los sistemas se comunican enviando y recibiendo datos en formato JSON (JavaScript Object Notation), XML 
(eXtensible Markup Language) u otros formatos similares a través de solicitudes HTTP.

## Requisitos previos

Asegúrate de tener instalado lo siguiente:

- Node.js (versión 18 o superior)
- MySQL (versión 8 o superior)
- XAMPP v3.3.0
- Crear una base de datos para que utilice este proyecto

## Configuración

1. Clona el repositorio: `git clone https://github.com/marianopsico/Backend_LetEatB.git`
2. Navega al directorio del proyecto: `cd Backend_LetEatB`
3. Instala las dependencias: `npm install`

## Configuración del archivo .env

1. Crea un archivo llamado `.env` en la raíz del proyecto.
2. Abre el archivo `.env` en un editor de texto.
3. Completa el archivo `.env` con la siguiente información:

    SERVER_PORT = 8080
    DATABASE = tu_base_de_datos
    DB_HOST = localhost
    DB_USERNAME = tu_usuario
    DB_PASSWORD = tu_contraseña
    DB_PORT = 3306
    DB_DIALECT = mysql
    SECRET_KEY = tu_frase_secreta

4. Guarda el archivo `.env`.
   
## Uso

Sigue los siguientes pasos para ejecutar el proyecto:

1. Asegúrate de tener XAMPP instalado y ejecutando. Esto proporcionará el servidor de base de datos MySQL necesario para el proyecto.

2. Inicia el servidor MySQL de XAMPP y crea una nueva base de datos en phpMyAdmin para que el proyecto la utilice. Puedes nombrarla como desees.

3. Completa el archivo `.env` con los detalles de configuración de tu base de datos (como se describió anteriormente en la sección "Configuración del archivo .env").

4. Ejecuta el siguiente comando para iniciar el servidor de desarrollo:

  - npm start

   Esto iniciará el servidor Node.js y la API estará disponible en http://localhost:8080.

1. Puedes probar la API utilizando herramientas como Postman, cURL o Thunder en VSCode. Aquí hay algunos ejemplos de endpoints disponibles:

Entidad users:
- POST /users/resgister: Crea un nuevo usuario en la base de datos.
- GET /users/: Obtiene una lista de todos los usuarios registrados en caso que el usuario loqueado sea un administrador.
- GET /users/restaurnat-distances: esta ruta devuelve un listado de restaurantes activos ordenados por proximidad con el usuario logueado
- PUT /users/:id   Si sos un usuario administrador o sos el usuario logueado podes modificar sus datos
- GET /users/:id   Si sos un usuario administrador o sos el usuario logueado nos muestra sus datos
- GET /users/me:   Se utiliza para referirse al usuario actual o al propietario del recurso en el contexto de un sistema o una API. 
- DELETE /users/:id   Si sos un usauiro administrador elimina un usuario específico según su ID
- POST /users/login: Se utiliza para realizar el login
- POST /users/logout: Se utiliza para realizar el deslogueo

Entidad restaurants, todas las siguientes rutas requieren que el usuario sea un administrador:

- GET /restaurants/: Obtiene una lista de todos los restaurantes registrados.
- GET /restaurants/active: Obtiene una lista de todos los restaurantes Activos registrados.
- GET /restaurants/:id: Obtiene los detalles de un restaurante específico según su ID.
- POST /restaurants/:  Se utiliza para crear un nuevo restaurante
- PUT /restaurants/:id: se utiliza para actualizar los detalles de un restaurante existente según su ID.
- DELETE /restaurants/:id: Elimina un restaurante específico según su ID.

Asegúrate de enviar las solicitudes adecuadas con los datos requeridos en el cuerpo de la solicitud y/o los parámetros de la URL.

Explora el código fuente del proyecto para comprender mejor la estructura y las funcionalidades disponibles. 
Puedes encontrar los controladores, modelos y rutas en el directorio src.

¡Diviértete utilizando la API RESTful y gestionando usuarios y restaurantes!

## Estructura de directorios
.
├── src/
│   ├── config/          # Configuraciones del proyecto
│   ├── connectionDb/    # La conexion con la base de datos utilizando sequelize
|   ├── controllers/     # Controladores que manejan la lógica de la API
|   ├── middlewares/     # Validacion de datos de usuarios y restaurantes, validacion de logueo, de usuarios administradores y usuarios logueados 
│   ├── models/          # Modelos de datos para interactuar con la base de datos
│   ├── routes/          # Definición de rutas y endpoints de la API
│   ├── seed/            # Directorio de los seeds
│   ├── utils/           # Funcion para calcular la distancia en KM entre dos ubicaciones y funcion para generar token
│   └── server.js        # Archivo principal del proyecto
├── .env.example         # Archivo modelo para crear el archivo de configuración del entorno
├── package.json         # Información del proyecto y dependencias
└── README.md            # Documentación del proyecto


## Contribución

¡Estamos abiertos a contribuciones! Si deseas colaborar en el proyecto, puedes seguir estos pasos:

  1.Realiza un fork del repositorio y clona tu propia copia en tu máquina local.
  
  2.Crea una nueva rama para realizar tus modificaciones:git checkout -b nombre-de-la-rama
  
  3.Realiza los cambios y mejoras en tu rama local.
  
  4 Sube los cambios a tu repositorio remoto:git push origin nombre-de-la-rama

  5.Abre una solicitud de extracción en GitHub desde tu rama hacia la rama principal del proyecto.

Agradecemos cualquier contribución, ya sea a través de la presentación de problemas, solicitudes de características o mejoras en la documentación.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más información.




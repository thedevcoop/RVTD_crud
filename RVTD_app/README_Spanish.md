# RVTD

## Empezando

### Qué se usa

* Nodo JS
* React JS
* MySQL 5.7
* Bootstrap
* CLI (interfaz de línea de comando)
* Sequel Pro (GUI)
* Atom IDE (sin dependencias de paquetes principales)
* npm

### Lleve el código

* abra su CLI (interfaz de línea de comando)
* `git clone <repo>`
  * `git clone git@github.com:joegreen2/RVTD_app.git`

### Bueno saber

* todos los archivos del lado del servidor están en la carpeta del directorio
  _**server**_
* todos los archivos del lado del cliente están en la carpeta del directorio
  _**client**_
* _**.gitignore**_ el archivo está configurado para ignorar el directorio
  **node_modules** y _secrets_ de github
* al clonar este repositorio necesitarás crear tu propio directorio _secrets con
  un archivo `db_configuration.js`_ dentro y`npm install` node_modules en el
  servidor Node y en el servidor React, estas instrucciones paso a paso están
  debajo

* **_para evitar problemas, seguir estos pasos es imprescindible._**

# Node

### Crea tu directorio 'secretos' y archivo de configuración

* Para la base de datos deberá agregar un directorio de secretos en el nivel
  raíz y dentro de ese directorio un archivo `db_configuration.js`

_**nota:**_ **NO deberías poder ver el directorio 'secretos' o el archivo
`db_configuration.js` (tiene acceso a tu base de datos, y debe estar 'oculto'
por el archivo .gitignore por valor predeterminado de este informe)**

* `cd <ToYourRootProjectDirectory>/`
* `mkdir secrets`
* `cd secrets/`
* `touch db_configuration.js`
* Abra este archivo para agregar credenciales de base de datos. (para el átomo
  IDE en CLI tipo `atom db_configuration.js`)

```javascript
module.exports = {
  user: "usuario",
  host: "localhost",
  database: "base de datos",
  password: "contraseña",
  port: 3306
};
```

* regresemos a nuestra raíz del proyecto
  * `cd ../` debería devolvernos
  * seguir y abrir este proyecto en su IDE (editor de código) `atom .` para
    átomo IDE

## instalaciones de npm

#### ¡Importante!

* _**AMBOS**_ El archivo Sede `package.json` y el archivo`package.json` del
  servidor React necesitan su propio comando `npm install`

* **_run_** `cd client/` **_para ingresar al directorio 'client' que contiene
  los archivos del servidor React, este directorio requiere una instalación npm
  separada para su archivo `package.json`_**

* **_En la carpeta del directorio del cliente_**

  * ejecuta `npm install` para obtener paquetes para esta aplicación

* **_run_** `cd ../` **_para volver al directorio raíz que contiene el archivo
  Node `package.json` que también requiere una instalación independiente de
  npm_**

* **_En la raíz del proyecto_**

  * ejecuta `npm install` para obtener paquetes para esta aplicación

* **dependencias**

  * _*express*_
  * _*body-parser*_
  * _*mysql*_
  * _*axios*_
  * _*reaccionar*_
  * _*react-dom*_
  * _*react-bootstrap*_
  * _*concurrentemente*_

* **dependencias de desarrollo**
  * _*nodemon*_

### Scripts de nodo (paquete.json)

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./server/bin/www",
    "server": "nodemon ./server/bin/www",
    "configure": "./server/bin/configuredb.sh",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
    },
```

#### ¿Qué está pasando en este script?

* Los scripts son palabras clave utilizadas para hacer referencia a un script de
  código previamente escrito, esto le permite ejecutar un script más largo de
  código con una palabra clave (es posible que esté familiarizado con `npm
  start` o `npm run dev`)

#### Guiones para tomar nota de:

* **configure**: crea una base de datos sin semilla para probar
* **cliente**: ejecuta el servidor cliente. _note\*_ _*`--prefix client`*_ le
  dice a esto que ejecute el script _*`start`*_ desde el archivo `package.json`
  de la carpeta del cliente
* **dev**: está utilizando el paquete npm _*concurrently*_ para ejecutar el
  servidor de nodo y luego el servidor de reacción, ambos en una sola pestaña
  CLI

### Crear base de datos

* `server/bin/configuredb.sh` contendrá un script bash para iniciar sesión y
  crear una base de datos automáticamente
* `server/bin/sql/[file].sql` contendrá la creación e inserción de tabla en los
  datos de inicialización
* **_en la ejecución de la ventana CLI_** `npm run configure`
* deberías obtener

```shell
Configuración de la base de datos: <databasename>
<databasename> configurado
```

## Suficiente tutorial solo déjame verlo!

#### Entiendo que has sido lo suficientemente paciente ...

* desde la raíz del proyecto en la CLI ejecute `npm run dev`, esto iniciará el
  servidor de fondo de Node seguido por el servidor de aplicaciones para
  resolver React que iniciará la ventana de su navegador y lo encaminará a
  `http://localhost:3000/` entonces tendrá la aplicación de trabajo completa.
* **Para ver y comprender más acerca de esta aplicación, te animo a que
  continúes desplazándote y leas los "misterios" de
  [origen cruzado y proxy](https://github.com/joegreen2/RVTD_app#understanding-cross-origin--proxy-setting).**

## El servidor (API)

* Iniciando el servidor de nodo

  * `npm run server` en la CLI iniciará el servidor
  * `control + c` en la CLI apagará el servidor
  * Si lo desea, puede probar la aplicación del nodo de fondo iniciando el
    servidor y utilizando las llamadas de la API que figuran a continuación, una
    vez que haya terminado, adelante, cierre el servidor y comience a usar la
    API creada con Node con React.js

* Estructura general de URL para Node.js

  * `http://localhost:5000/people/[YourRequestHere]`

* para todos los datos, puede elegir

  * `http://localhost:5000/people/json`

* o seleccione una información de usuario específica con el id adecuado como:

  * `http://localhost:5000/people/36`

## comprensión de origen cruzado y configuración proxy

* estamos utilizando un `puerto de servidor de nodo: 5000` y un `puerto de
  servidor de React: 3000` ...
* Para que estos dos servidores funcionen perfectamente, crearemos un _*proxy*_
  dentro del _*archivo `package.json` del cliente*_

```
	"proxy": {
	    "/people/*": {
	      "target": "http://localhost:5000"
	    }
	  },
```

* Básicamente, esto preajusta `http://localhost:5000` a cada ruta que tenga
  `/people/`, por lo que`http://localhost:3000/people` llamará
  `http://localhost:5000/people` detrás de las escenas

## El cliente (navegador)

### usando la aplicación del navegador

* abra el navegador y vea todos los datos en

  * vista del cliente: `http://localhost:3000`

* En el navegador, tendrá funcionalidad completa CRUD (crear, leer, actualizar,
  eliminar).
  * **CREAR:** al hacer clic en el botón _**crear nuevo usuario**_ se abrirá una
    ventana de diálogo modal con un campo de formulario para ingresar valores,
    luego se presiona _**guardar cambios**_ para agregar datos a la base de
    datos.

  * **LEER:** de forma predeterminada `http://localhost3000` mostrará todos los
    datos en la base de datos. para obtener detalles más específicos, como `id`
    de datos, puede presionar directamente la API escribiendo lo siguiente en el
    campo URL `http://localhost3000/people/json` si desea recuperar un `id`
    específico use `http://localhost3000/people/id`

  * **ACTUALIZACIÓN:** para actualizar un registro existente de datos,
    seleccione el botón _**actualizar**_ que corresponda con los datos que desea
    editar, aparecerá una ventana de diálogo modal con los datos actuales
    poblados en el campos por defecto. Cambie lo que necesita actualizar y luego
    envíe los cambios.

  * **ELIMINAR:** para eliminar un registro existente de datos, seleccione el
    botón _**borrar**_ que corresponda con los datos que desea eliminar,
    aparecerá una ventana de aviso y deberá responder escribiendo: _"*delete*"_
    en el campo de solicitud para asegurarse de que desea eliminar
    permanentemente los datos de la base de datos. Si _"*delete*"_ no se escribe
    en el campo de solicitud, los datos no se eliminarán.

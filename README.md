##Resumen del Proyecto##

En este ejercicio construí una API de Mini Inventario utilizando Docker. Básicamente, lo que hace el proyecto es organizar dos servicios para que trabajen juntos sin que yo tenga que instalar bases de datos o librerías complicadas directamente en mi computadora.

El proyecto está dividido en dos grandes partes que se comunican entre sí:

La API (Node.js/Express): Es el "cerebro". Se encarga de recibir las peticiones (como cuando entramos a /productos) y pedirle la información a la base de datos.

La Base de Datos (MySQL): Es donde se guarda toda la información de los productos (como el ID, nombre y precio).

##Lo que Aprendi de este Proyecto##

Para que esto funcionara, usé Docker Compose, que me sirvió como un "director de orquesta". Aprendí que:

Cada servicio vive en su propio contenedor (como una cajita independiente).

Para que la API y MySQL se pudieran hablar, los conecté a una red virtual llamada dokploy-network.

Usé un Dockerfile para darle las instrucciones a Docker de cómo preparar el entorno de Node.js, copiar mi código e instalar lo necesario.

##Mi experiencia con CI (GitHub Actions)##

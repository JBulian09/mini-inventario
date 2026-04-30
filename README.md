**Resumen del Proyecto**

En este ejercicio construí una API de Mini Inventario utilizando Docker. Básicamente, lo que hace el proyecto es organizar dos servicios para que trabajen juntos sin que yo tenga que instalar bases de datos o librerías complicadas directamente en mi computadora.

El proyecto está dividido en dos grandes partes que se comunican entre sí:

La API (Node.js/Express): Es el "cerebro". Se encarga de recibir las peticiones (como cuando entramos a /productos) y pedirle la información a la base de datos.

La Base de Datos (MySQL): Es donde se guarda toda la información de los productos (como el ID, nombre y precio).

**Lo que Aprendi de este Proyecto**

Para que esto funcionara, usé Docker Compose, que me sirvió como un "director de orquesta". Aprendí que:

Cada servicio vive en su propio contenedor (como una cajita independiente).

Para que la API y MySQL se pudieran hablar, los conecté a una red virtual llamada dokploy-network.

Usé un Dockerfile para darle las instrucciones a Docker de cómo preparar el entorno de Node.js, copiar mi código e instalar lo necesario.

**Mi experiencia con CI (GitHub Actions)**

Algo nuevo para mí fue configurar el Pipeline de GitHub Actions. Al principio me dio errores porque me faltaba crear la red en el servidor de GitHub, pero una vez que lo corregí, entendí que esto sirve para avisarme automáticamente si mi código está "sano" y listo para usarse antes de mandarlo al servidor del profe.

------------------------------------------------------------------------------------------------------------------------------------------------

**Reflexión Final**

1. ¿Qué ventajas ofrece Docker para el despliegue de aplicaciones?
   
La mayor ventaja es que no tengo que preocuparme por si el profesor tiene instalado Node o MySQL en su compu. Como todo va en "paquetes" (contenedores), mi código corre igual en cualquier lado sin errores de configuración.

3. ¿Qué es y para qué sirve Docker Compose?
   
Es un archivo que sirve para prender varios contenedores al mismo tiempo con un solo comando. En lugar de prender la API y luego la base de datos por separado, el Compose los conecta y los arranca juntos de forma organizada.

4. ¿Cuál es la diferencia entre un Dockerfile y un archivo Docker Compose?
   
El Dockerfile son las instrucciones para armar la imagen de mi aplicación (como el sistema operativo y el código). El Docker Compose es el que dice cómo se van a llevar esa aplicación y la base de datos, definiendo la red y los puertos.

5. ¿Qué es la Integración Continua (CI) y cómo beneficia al desarrollo de software?
   
Es un proceso automático que revisa mi código cada vez que hago un push a GitHub. Me ayudó mucho porque si algo estaba mal en mi Docker o en la conexión, el "check verde" no salía y así supe que tenía que corregirlo antes de entregarlo.

### Joyas API

Esta es una API básica construida con Express.js que proporciona endpoints para manejar datos de joyas y aplicar conceptos de HATEOAS (Hypermedia as the Engine of Application State).

#### Endpoints Disponibles

1. **Obtener Todas las Joyas**
   - Método: `GET`
   - Ruta: `/joyas`
   - Descripción: Devuelve todas las joyas almacenadas en la base de datos.
   - Ejemplo de uso:
     ```
     http://localhost:3000/joyas
     ```

2. **Obtener Joyas por Categoría**
   - Método: `GET`
   - Ruta: `/joyas/categoria/:categoria`
   - Descripción: Devuelve las joyas que pertenecen a una categoría específica.
   - Ejemplo de uso:
     ```
     http://localhost:3000/joyas/categoria/collar
     ```

3. **Obtener Detalles de una Joya**
   - Método: `GET`
   - Ruta: `/joyas/:id`
   - Descripción: Devuelve los detalles de una joya específica por su ID. También permite filtrar los campos específicos de la joya.
   - Ejemplo de uso:
     ```
     http://localhost:3000/joyas/1
     http://localhost:3000/joyas/1?campos=id,name,model,category
     ```

4. **Obtener Estructura HATEOAS de Todas las Joyas**
   - Método: `GET`
   - Ruta: `/joyas`
   - Parámetros de consulta:
     - `page`: Para paginar los resultados.
     - `values=asc` o `values=desc`: Ordena las joyas por valor ascendente o descendente.
   - Descripción: Devuelve la estructura HATEOAS (Hypermedia as the Engine of Application State) de todas las joyas almacenadas.
   - Ejemplo de uso:
     ```
     http://localhost:3000/joyas?page=2
     http://localhost:3000/joyas?values=asc
     ```

#### Estructura HATEOAS Generada

La API también genera automáticamente enlaces HATEOAS para cada joya, proporcionando acceso directo a:
- La categoría de la joya.
- La joya específica por su ID.
- Los campos específicos de la joya.

Estos enlaces están integrados en la respuesta JSON de `/joyas`.

#### Código Base

El código está construido sobre Node.js con Express.js y utiliza un archivo local (`joyas.js`) para almacenar los datos de las joyas. Asegúrate de que el archivo `joyas.js` esté correctamente configurado y contenga la estructura de datos adecuada para que la API funcione correctamente.

### Configuración y Uso

Para utilizar esta API:
1. Clona el repositorio o descarga los archivos.
2. Instala las dependencias con `npm install`.
3. Ejecuta la aplicación con `node app.js` o `npm start`.
4. Accede a los diferentes endpoints según las necesidades de tu aplicación.

¡Disfruta utilizando la API de Joyas!
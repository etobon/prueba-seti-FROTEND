Prueba de Ingreso Seti: (Desarrollo de Aplicación Móvil Ionic & Angular + Capacitor)
--------------------------------

Ejercicio # 2:
El objetivo de esta prueba es evaluar tus habilidades en el desarrollo de aplicaciones móviles utilizando el framework Ionic. A través de este ejercicio, queremos ver cómo abordas el desarrollo de una nueva funcionalidad, mejoras la experiencia del usuario y optimizas el rendimiento de una aplicación existente. Además, se evaluará tu capacidad para trabajar con herramientas de control de versiones y servicios en la nube.

Funcionalidad:
--------------------

Descripción de la Aplicación Base, Crea una aplicación base con una sencilla lista de tareas (To-Do List) que permite a los
usuarios:
• Agregar nuevas tareas.
• Marcar tareas como completadas.
• Eliminar tareas.

La aplicación está construida con Ionic y Angular, y utiliza almacenamiento local para guardar el estado de las tareas. Añadir la capacidad de categorizar tareas. Los usuarios deben poder:

o Crear, editar y eliminar categorías.
o Asignar una categoría a cada tarea.
o Filtrar las tareas por categoría.


Criterios de Aceptacion:
----------------------
1 Asegúrate de que la aplicación puede ser compilada para ambas plataformas usando Córdova:
----
Se hace uso de Capacitor puesto que actualmente Cordova está en desuso y Capacitor nos ofrece mucho mas beneficiios para generar y desplegar la app en Sistemas Android & IOS

2 Instrucciones para compilar y genear app para Android & IOS (Generar Bundle para PlayStore de Android):
-------------

Los siguientes son los pasos a seguir para generar, firmar y crear Bundle de la app para PlayStore asi:

1. ionic build [ambiente].
Este comando nos permite compilar el codigo de la app, como en nuestro caso no estamos usando ambientes, pues no se pone, solamente usamos el comando ionic build

2. npm install @capacitor/android
Asegurarse de tener instalado Capacitor / Android, si no está instalado ejecutar

3. npx cap add android
Agrrega capacitor a Android Studio en caso de No tenerlo instalado.
Nota: Si ya está instalado, se debe sincronizar el proyecto de Capacitor con Android Studio, para esto, ejecutar: npx cap sync android

5. npx cap open android
Abrir el proyecto en Android Studio para generar firma y bundle

6. En Android Studio, abrir la aplicacion y esperar la actualización de Dependencias de Gradle (Segun sea el caso)

7. En Android Studio:
  * /build/Generate Signed Bundle (Seleccionar por default Bundle)
  * Generar Almacen de llaves (keyStore para la firma, diligenciar todas las opciones solicitadas)
  * Guardar llave encriptada (Fundamental para poder firmarse correctamente)
  * Aceptar y generar Bundle Firmado
    
8. Subir bundle a Google Play Console (realizar pago de membesia 25U$) y seguir instrucciones de Google Corp.


Desafios Presentados en la Prueba
---------------

1. Hubiera querido más tiempo para haber teminado a cabalidad la app (con integración Firebase y demás para motoreo, dashboard de usabilidad y metricas)
2. Gasté mucho tiempo validando contra Córdova porque así lo pedía el requerimiento.  (Me fue mas fluido al hacelo con Capacitor)
3. Hubiera sido genial poder integrar en tiempo real contra una api-rest (de task), pero ..., lastimosamente no alcancé.

De todas maneras... 

Fue gradioso poder tratado de hacer este reto!








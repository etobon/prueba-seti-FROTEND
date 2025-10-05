Prueba de Ingreso Seti: (Desarrollo de Aplicación Móvil Ionic & Angular + Capacitor)
--------------------------------

Ejercicio # 2:
El objetivo de esta prueba es evaluar tus habilidades en el desarrollo de aplicaciones móviles utilizando el framework Ionic. A través de este ejercicio, queremos ver cómo abordas el desarrollo de una nueva funcionalidad, mejoras la experiencia del usuario y optimizas el rendimiento de una aplicación existente. Además, se evaluará tu capacidad para trabajar con herramientas de control de versiones y servicios en la nube.

Criterios de Aceptacion:
----------------------
1 Projecto desarrollado en SpringBoot usando programacion reactiva (WebFlux) sobre Arquitectura Hexagonal
Se desarrolló bajo Patron de Arquitectura: Hexagonal. La estructura arquitectónica del proyecto es asi:
image
Todo el sistema API-Rest fue desarrollado bajo WebFlux, para eso lo primero es asegurarse que en el POM,Xml del proyecto se tenga la dependencia de Spring WebFlux
image
2 Base de datos seleccionada: MySQL:
Como el desarrollo es bajo WebFlux (Rx), es fundmental trabajar con R2DBC (Reactive Relational Database Connectivity), puesto que MySQL por default gestiona con JDBC (el cual es bloquente) pero WebFlux es NO bloqueante osea que R2DBC es el mecanismo usado por webflux para garantizar consultas a Bases de Datos de manera No bloqueantes (Soportando Mono / Flux) elementos fundamentales de RxJava y Project Reactor de Spring

image
Modelo Entidad Relacion (MER)

CREATE DATABASE IF NOT EXISTS seti_db; USE seti_db;

CREATE TABLE franchises ( id bigint NOT NULL AUTO_INCREMENT, name varchar(255) DEFAULT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE franchises ( id bigint NOT NULL AUTO_INCREMENT, name varchar(255) DEFAULT NULL, PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE products ( id bigint NOT NULL AUTO_INCREMENT, branch_id bigint NOT NULL, name varchar(255) DEFAULT NULL, stock bigint DEFAULT NULL, PRIMARY KEY (id), KEY branch_id (branch_id), CONSTRAINT branch_id FOREIGN KEY (branch_id) REFERENCES branches (id) ON DELETE CASCADE ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

3 Las respuestas de los servicios deben ser encadenadas con operadores MAP, FLATMAP, MERGE, Etc.
Todo el funcionamiento de los servicios de la capa Aplicaction (Services: FranchiseService, BranchService, ProductService) trabajan con streams encadenando la respuesta a Map, FlatMap, segun sea necesario

4 Use correctamente los señales onNext, onError, onComplete.
Todo el funcionamiento de los servicios de la capa Aplicaction (Services: FranchiseService, BranchService, ProductService) trabajan con streams encadenando la respuesta a Map, FlatMap, segun sea necesario

5 Pruebas Unitarias en Servicios (deben superar el 80% de cobertura):
Todos los servicios de la capa Application tienen cobertura del 85%, pruebas unitarias realizadas con Junit & Mockito, gracias al plugin de Jacoco, se puede observar la cobertura en formato HTML del site image

Funcionalidad:
Para garantizar la funcionalidad del proyecto, se deben ejecutar los siguientes comandos:

./mvnw clean install

Este comando generará el archivo .jar (Ejecutable) de la Api.jar dentro de la carpeta /target del pryecto

java -jar [prueba-0.0.1-SNAPSHOT.jar] (archivo .jar generado)

image
Todas las funcionalidades de la API están contempladas en los siguientes servicios:

Servicios de la API
1 Adicionar una Franqucia:
Protocol: POST
EndPoint: /localhost:8080/api/franchises"

JsonRequest:
{
	"name": "Nombre Franqucia"
}

JsonResponse:
{
	"id": 17,
	"name": "Nombre Franquicia",
	"branches": []
}
3 Listar todas las franchises
Protocol: GET
EndPoint: /localhost:8080/api/franchises"

JsonRequest:
nada

JsonResponse:
{
	"id": 17,
	"name": "Nombre Franquicia",
	"branches": []
}
4 Adicioanr una Sucursal a una franquicia
Protocol: POST
EndPoint: /localhost:8080/api/branches/{franchiseId}"

Ejemplo: Ejemplo: http://localhost:8080/api/branches/17

JsonRequest:
{
	"name" : "Brach 1"
}

JsonResponse:
{
	"id": null,
	"franchiseId": 17,
	"name": "Brach 1",
	"products": []
}
5 Actualiar nombre de Sucursal
Protocol: PUT
EndPoint: http://localhost:8080/api/branches/{id}?name={nombre nuevo}"

Ejemplo: http://localhost:8080/api/branches/4?name=prueba1

JsonRequest:
nada

JsonResponse:
{
	"id": 4,
	"name": "prueba1",
	"franchiseId": 17
}
6 Adicioanr un producto a una sucursal
Protocol: POST
EndPoint: http://localhost:8080/api/products/{branchId}"

Ejemplo: http://localhost:8080/api/products/4

JsonRequest:
{
  "name": "Producto 4",
  "stock": 2500
}

JsonResponse:
{
	"id": 8,
	"branchId": 4,
	"name": "Producto 4",
	"stock": 2500
}
7 Borrar un producto
Protocol: DEL
EndPoint: http://localhost:8080/api/products/{id}"

Ejemplo: http://localhost:8080/api/products/8

JsonRequest:
nada

JsonResponse:
nada, estatus= 200
8 Modificar Stock de un producto
Protocol: PUT
EndPoint: http://localhost:8080/api/products/{id}/{Stock}"

Ejemplo: http://localhost:8080/api/products/7/3000

JsonRequest:
nada

JsonResponse:
{
	"id": 7,
	"name": "Producto 7",
	"stock": 2100,
	"branchId": 4
}
9 Encontrar maximo stock de producto en una sucursl:
Protocol: GET
EndPoint: http://localhost:8080/api/products/max/{branchid}"

Ejemplo: http://localhost:8080/api/products/max/4

JsonRequest:
nada

JsonResponse:
{
	"id": 7,
	"branchId": 4,
	"name": "Producto 7",
	"stock": 2100
}
10 Actualizar nombre de un producto
Protocol: PUT
EndPoint: http://localhost:8080/api/products/{id}"

Ejemplo: http://localhost:8080/api/products/7

JsonRequest:
{
  "name": "Producto X",
  "stock": 2500
}

JsonResponse:
{
	"id": 7,
	"branchId": 4,
	"name": "Producto 7",
	"stock": 2100
}
Algunas ejecuciones de Sevicios desde Postman:

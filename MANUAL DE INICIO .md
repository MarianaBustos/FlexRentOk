
MANUAL DE INICIO 

Requisitos previos 
•	Tener instalado Visual Studio Code u otro.
•	Tener instalado MySQL u otro para manejo de base de datos.

Configuración de MySQL/otro 
•	Descargar el archivo de GitHub de  preferencia: 1. FLEXRENT_Final con Inserts.sql o 2. FLEXRENT_FinalOk.sql y abrir con MySQL.
•	Ejecutar pulsando sobre este rayo (         ) y deberá aparecer todo correcto con check verdes.
* Para generar un usuario administrador se deberá registrar a través de la página y modificar el campo category de la tabla User, deberá pasar de 2 a 1.
* Para cambiar de category deberá hacer “SELECT * FROM user;” y pulsar sobre el rayo (       ).
Aparecerá un recuadro en el cual nos colocamos sobre category, cambiamos el número de 2 a 1 y pulsamos sobre apply.


Configuración de Visual Code/otro 

1.	Abrir el proyecto con Visual Studio Code y en la terminal pinchamos en new Terminal.
2.	Clonar el repositorio del proyecto desde GitHub poniendo esto  git clone https://github.com/reposocratech/FlexRent.git y pegar en la terminal.
3.	Pegar carpeta .env en server (esta carpeta contendrá las contraseñas).
4.	Abrir dos terminales, una para client (Front) y otra para server (Back).
5.	Mover a las carpetas con “cd client” y “cd server” para situarnos en ellas.
6.	Hacer “npm i” para cd client y otro “npm i” para server.
7.	Levantar el servidor de client con “npm start” y el de server con “npm run dev”.
8.	Abra ahora su navegador web y acceda a http://localhost:3000 para ver el proyecto en funcionamiento. ¡Listo! Ahora deberá tener el proyecto FLEXRENT configurado y en funcionamiento en tu entorno local. 

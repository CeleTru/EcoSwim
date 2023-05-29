<?php

// Hacer la solicitud a la API de provincias
$response = file_get_contents("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre");

// Devolver los datos en formato JSON
header("Content-Type: application/json");
echo $response;

?>
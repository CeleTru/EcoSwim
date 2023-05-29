<?php

// Capturar los datos del formulario
$nombre = $_POST['name'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$mensaje = $_POST['message'];
$provincia = $_POST['Provincia'];
$localidad = $_POST['Localidad'];
$modeloInteres = $_POST['modeloInteres'];
$formaPago = $_POST['formaPago'];

// Construir el contenido del correo
$to = 'arqcelestetru@gmail.com'; // Cambia esto por tu dirección de correo
$subject = 'Nuevo mensaje del formulario de contacto';
$body = "Nombre: $nombre\n";
$body .= "Email: $email\n";
$body .= "Teléfono: $telefono\n";
$body .= "Mensaje: $mensaje\n";
$body .= "Provincia: $provincia\n";
$body .= "Localidad: $localidad\n";
$body .= "Modelo de interés: $modeloInteres\n";
$body .= "Forma de pago: $formaPago\n";

// Enviar el correo
mail($to, $subject, $body);

// Redireccionar al usuario a una página de éxito o mostrar un mensaje de confirmación
header('Location: contacto_exitoso.html');
?>
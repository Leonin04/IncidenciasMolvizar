<?php

$host = 'database'; 
$db   = 'incidenciasMolvizar';
$user = 'incidenciasMolvizar';
$pass = '1234'; 
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Reporta errores de SQL
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Devuelve los datos como array asociativo
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Mejora la seguridad contra inyecciones SQL
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
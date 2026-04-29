<?php

require_once 'vendor/autoload.php';

require_once 'database.php';

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

try {

    $query = "SELECT n.*, l.nombre_lugar, i.ruta_archivo as foto_portada 
              FROM noticias n 
              LEFT JOIN lugares l ON n.id_lugar = l.id 
              LEFT JOIN imagenes i ON n.id = i.id_noticia AND i.es_portada = 1
              ORDER BY n.fecha DESC";
              
    $stmt = $pdo->query($query);
    $noticias = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $pdo = null;

    echo $twig->render('portada.twig', [
        'noticias' => $noticias
    ]);

} catch (PDOException $e) {
    echo "Error al cargar las noticias: " . $e->getMessage();
}
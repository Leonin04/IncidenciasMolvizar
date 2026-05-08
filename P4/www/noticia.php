<?php

require_once 'vendor/autoload.php';

require_once 'database.php';

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

try {

    $id = isset($_GET['id']) ? (int)$_GET['id'] : 1;

    $query_noticia = "SELECT n.*, l.nombre_lugar 
                      FROM noticias n 
                      LEFT JOIN lugares l ON n.id_lugar = l.id 
                      WHERE n.id = :id";
                      
    $stmt = $pdo->prepare($query_noticia);
    $stmt->execute(['id' => $id]);
    $noticia = $stmt->fetch(PDO::FETCH_ASSOC);

    $query_imagenes = "SELECT * FROM imagenes WHERE id_noticia = :id";
    
    $stmt_img = $pdo->prepare($query_imagenes);
    $stmt_img->execute(['id' => $id]);
    $imagenes = $stmt_img->fetchAll(PDO::FETCH_ASSOC);

    $query_comentarios = "SELECT * FROM comentarios WHERE id_noticia = :id ORDER BY fecha DESC";
    $stmt_com = $pdo->prepare($query_comentarios);
    $stmt_com->execute(['id' => $id]);
    $comentarios = $stmt_com->fetchAll(PDO::FETCH_ASSOC);
    $comentariosJson = json_encode($comentarios, JSON_PRETTY_PRINT);

    $query_lugares = "SELECT nombre_lugar FROM lugares";
    $stmt_lugares = $pdo->query($query_lugares);
    $lugares = $stmt_lugares->fetchAll(PDO::FETCH_COLUMN);
    $lugaresJson = json_encode($lugares, JSON_UNESCAPED_UNICODE);

    $pdo = null;

    if (!$noticia) {
        die("La noticia no existe."); 
    }

    echo $twig->render('noticia.twig', [
        'noticia' => $noticia,
        'imagenes' => $imagenes,
        'comentarios' => $comentariosJson,
        'localidades' => $lugaresJson,
        'imprimir' => false,
    ]);

} catch (PDOException $e) {
    echo "Error al cargar las noticias: " . $e->getMessage();
}
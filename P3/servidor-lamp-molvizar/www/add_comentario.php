<?php
require_once 'database.php';

header('Content-Type: application/json');

// Comprobar que es una petición POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger y limpiar los datos
    $id_noticia = isset($_POST['id_noticia']) ? (int)$_POST['id_noticia'] : 0;
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $texto = isset($_POST['texto']) ? trim($_POST['texto']) : '';

    // Validar datos básicos
    if ($id_noticia > 0 && !empty($nombre) && !empty($email) && !empty($texto)) {
        try {
            // Preparar la consulta SQL de inserción
            $query = "INSERT INTO comentarios (id_noticia, nombre, email, texto, fecha) VALUES (:id_noticia, :nombre, :email, :texto, NOW())";
            $stmt = $pdo->prepare($query);
            
            // Ejecutar la consulta con los datos recibidos
            $stmt->execute([
                'id_noticia' => $id_noticia,
                'nombre' => $nombre,
                'email' => $email,
                'texto' => $texto
            ]);
            
            // Obtener la fecha exacta generada por MySQL para devolverla a JS
            $id_insertado = $pdo->lastInsertId();
            $query_fecha = "SELECT fecha FROM comentarios WHERE id = :id";
            $stmt_fecha = $pdo->prepare($query_fecha);
            $stmt_fecha->execute(['id' => $id_insertado]);
            $fecha_db = $stmt_fecha->fetchColumn();

            $pdo = null;

            // Responder con éxito y la fecha
            echo json_encode(['success' => true, 'fecha' => $fecha_db]);
        } catch (PDOException $e) {
            // Manejar errores de base de datos
            echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Faltan datos obligatorios.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método no permitido.']);
}
?>

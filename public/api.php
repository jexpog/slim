<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '..\vendor\autoload.php';
require '..\src\config\db.php';

//peticion get para listar los hostings
$app = new \Slim\App;


$app->get('/api/hostings', function (Request $request, Response $response) {
  $consulta = "SELECT * FROM hosting";
  try{
      // Base de datos
      $db = new db();

      // Conexión
      $db = $db->conectar();
      $ejecutar = $db->query($consulta);
      $hostings = $ejecutar->fetchAll(PDO::FETCH_OBJ);
      $db = null;


      echo json_encode($hostings);

  } catch(PDOException $e){
      echo '{"error": {"text": '.$e->getMessage().'}';
  }
});

//peticion post para crear un hosting
$app->post('/api/hosting/agregar', function(Request $request, Response $response){


      $input = json_decode($request->getBody());
  //    $data=$request->getParams();

       $nombre = $input->nombre;
       $cores = $input->cores;
       $memoria = $input->memoria;
       $disco = $input->disco;


        $consulta = "INSERT INTO hosting (nombre, cores, memoria, disco) VALUES
        ('$nombre', '$cores', '$memoria', '$disco')";

        // Base de datos
        $db = new db();

        // Conexión
        $db = $db->conectar();
        $stmt = $db->prepare($consulta);

        $stmt->execute();

        return $this->response->withJson($nombre);
});

// Borrar cliente
$app->delete('/api/hostings/borrar/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');
    $sql = "DELETE FROM hosting WHERE id = $id";
    try{

        $db = new db();

        // Conexion
        $db = $db->conectar();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "hosting borrado"}';
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//actualiza el hosting
$app->put('/api/hostings/actualizar/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $input = json_decode($request->getBody());
    $data=$request->getParams();

    $nombre = $input->nombre;
    $cores = $input->cores;
    $memoria = $input->memoria;
    $disco = $input->disco;



     $consulta = "UPDATE hosting SET
				nombre 	    = '$nombre',
				cores 	    = '$cores',
        memoria	    = '$memoria',
        disco		    = '$disco'
			WHERE id = $id";


    try{
        // Instanciar la base de datos
        $db = new db();

        // Conexion
        $db = $db->conectar();
        $stmt = $db->prepare($consulta);
        $stmt->execute();

        echo '{"notice": {"text": "hosting actualizado"}';
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});


$app->run();

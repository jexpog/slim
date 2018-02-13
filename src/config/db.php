<?php
    class db{
        // Variables de conexión
        private $host = 'localhost';
        private $usuario = 'root';
        private $password = '';
        private $base = 'data_hosting';


        // Conectamos con la BD
        public function conectar(){
            $conexion_mysql = "mysql:host=$this->host;dbname=$this->base";
            $conexionDB = new PDO($conexion_mysql, $this->usuario, $this->password);
            $conexionDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conexionDB->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

            //error de codificacion arreglo
            $conexionDB -> exec("set names utf8");
            return $conexionDB;
        }
    }

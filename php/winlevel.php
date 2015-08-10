<?php

error_reporting(E_ALL);
session_start();
include('./config.php');

$level = $_POST['level'];
try
{
    $connexion = new PDO($source, $user,$motDePasse);
    $requete = "SELECT score FROM score WHERE id_level = ".$level." ORDER BY score ASC LIMIT 1";
    $resultat = $connexion->query($requete);

    if ($resultat->rowCount() > 0){

        foreach($resultat as $ligne) echo $ligne['score'];

    } else {
        echo "no_score";
    }
}

catch (PDOException $e)
{
    print 'Erreur PDO : '.$e->getMessage().'<br />';
    die();
}
?>
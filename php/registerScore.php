<?php

error_reporting(E_ALL);
session_start();
include('./config.php');
if (!isset($_SESSION['login'])) $_SESSION['login'] = "default_user";
$login = $_SESSION['login'];
$score = $_POST['score'];
$niveau = $_POST['level'];

try
{
    $connexion = new PDO($source, $user,$motDePasse);
    $requete = "SELECT ID FROM score WHERE id_player = '".$login."' AND id_level = '".$niveau."'";
    $resultat = $connexion->query($requete);

    if($resultat->rowCount() > 0)
    {
        foreach ($resultat as $ligne){
            if ($ligne['score'] > $score){
                $requete = "UPDATE score SET score = '".$score."' WHERE id_player = '".$login."' AND id_level = '".$niveau."'";
                $resultat = $connexion->query($requete);
            }
        }
    }
    else
    {
        $requete = "INSERT INTO `sokoban15`.`score` (`ID`, `id_player`, `id_level`, `score`) VALUES (NULL, '".$login."', '".$niveau."', '".$score."');";
        $resultat = $connexion->query($requete);
        

    }
}

catch (PDOException $e)
{
    print 'Erreur PDO : '.$e->getMessage().'<br />';
    die();
}
?>
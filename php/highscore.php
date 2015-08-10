<?php

error_reporting(E_ALL);
session_start();
include('./config.php');
if (!isset($_SESSION['login'])) $_SESSION['login'] = "default_user";
$login = $_SESSION['login'];

try
{
    $connexion = new PDO($source, $user,$motDePasse);
    $requete = "SELECT id_level FROM score WHERE id_level > 0 ORDER BY id_level DESC LIMIT 1";
    $resultat = $connexion->query($requete);
    
    if ($resultat->rowCount() > 0){
        
        foreach($resultat as $ligne) $nombreDeNiveau = $ligne['id_level'];
        
        for ($i = 1; $i <= $nombreDeNiveau; $i++){
            
            $requete = "SELECT * FROM score WHERE id_level = ".$i." ORDER BY score ASC LIMIT 1 ";
            $resultat = $connexion->query($requete);
            
            if($resultat->rowCount() > 0)
            {
                foreach($resultat as $ligne){
                    echo 'Max score pour le Niveau : '.$ligne['id_level'].' Joueur : '.$ligne['id_player'].' Score : '.$ligne['score'].'</br>';
                }
            }
        }
    } else {
        echo "Pas de score enregistré";
    }
}

catch (PDOException $e)
{
    print 'Erreur PDO : '.$e->getMessage().'<br />';
    die();
}
?>
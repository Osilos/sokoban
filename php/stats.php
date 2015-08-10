<?php

error_reporting(E_ALL);
include('./config.php');


try
{
    $connexion = new PDO($source, $user,$motDePasse);
    $requete = "SELECT ID FROM login ORDER BY ID DESC LIMIT 1";
    $resultat = $connexion->query($requete);
    
    if ($resultat->rowCount() > 0){
        $number = 0;
        foreach($resultat as $ligne) {$number++;}

        echo "Nombre de joueurs inscrits : ".$number."</br></br>";
    } else {
        echo "Pas d'utilisateur enregistré";
    }

    $requete = "SELECT ID FROM score";
    $resultat = $connexion->query($requete);
    
    if ($resultat->rowCount() > 0){
        
        $number = 0;
        
        foreach($resultat as $ligne)  $number++;

        echo "Nombre de niveaux joués : ".$number."</br></br>";
    } else 
    {
        echo "Aucun niveau n'a été joué ! ";
    }

    $requete = "SELECT ID FROM score WHERE 'id_level' = 15 ORDER BY ID DESC LIMIT 1";
    $resultat = $connexion->query($requete);
    
    if ($resultat->rowCount() > 0)
    {
        $number;
        foreach($resultat as $ligne) {
            $number++; 
        }
        echo "Le jeu a été fini : ".$number." fois.</br></br>";
    } else 
    {
        echo "Le jeu n'a pas été fini !";
    }

}

catch (PDOException $e)
{
    print 'Erreur PDO : '.$e->getMessage().'
            <br />
            ';
    die();
}
?>